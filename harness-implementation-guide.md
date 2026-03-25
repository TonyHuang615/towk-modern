# Harness Design 实现指南

## 1. 基础设置：使用 Anthropic API

### 依赖安装
```bash
pip install anthropic
# 或
npm install @anthropic-ai/sdk
```

### 环境配置
```python
# Python 示例
from anthropic import Anthropic

client = Anthropic()

# 保存 API 密钥到 .env
# ANTHROPIC_API_KEY=your_key_here
```

---

## 2. 核心架构：三代理系统

### 2.1 Planner 代理（规划者）
**目标**：将用户简短提示转换为详细的功能规格

```python
def run_planner(user_prompt):
    """
    输入：简单的产品描述（1-4句话）
    输出：详细的功能规格、设计原则、技术架构建议
    """
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": f"""你是产品规划专家。将以下简短提示扩展为完整的产品规格：

提示：{user_prompt}

请包含以下内容：
1. 产品概述（2-3句）
2. 核心功能（至少8个）
3. 技术栈建议
4. 用户故事（针对每个功能）
5. 设计原则和视觉风格指南
6. AI集成机会（如果适用）

优先考虑野心勃勃的范围。不要过度指定实现细节，让开发团队有灵活性。"""
            }
        ]
    )
    return response.content[0].text
```

### 2.2 Generator 代理（生成者）
**目标**：根据规格实现应用，定期自我评估

```python
def run_generator(spec, previous_code=None):
    """
    输入：产品规格、前一轮代码（如果有）
    输出：完整的应用代码（React + FastAPI + 数据库）
    """
    context = f"""现有代码：\n{previous_code}\n\n""" if previous_code else ""
    
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=8000,
        messages=[
            {
                "role": "user",
                "content": f"""你是全栈开发工程师。基于以下规格构建应用：

规格：
{spec}

{context}

请提供：
1. React + Vite 前端代码
2. FastAPI 后端代码
3. SQLite 数据库模式
4. 自我评估：代码质量、功能完整性、潜在的错误

技术栈要求：
- 前端：React 18, Vite, Tailwind CSS
- 后端：FastAPI，带数据库支持
- 数据库：SQLite（开发）/ PostgreSQL（生产）
- 版本控制：Git
"""
            }
        ]
    )
    return response.content[0].text
```

### 2.3 Evaluator 代理（评估者）
**目标**：独立测试和评估工作质量

```python
def run_evaluator(spec, generated_code, grading_criteria):
    """
    输入：规格、生成的代码、评分标准
    输出：详细的缺陷报告和改进建议
    
    评分标准示例：
    - 功能完整性：所有规格功能是否都实现了？
    - 代码质量：代码是否干净、有组织、可维护？
    - 设计质量：UI/UX 是否合理、一致？
    - 错误处理：是否有适当的错误处理？
    """
    
    response = client.messages.create(
        model="claude-opus-4-6",
        max_tokens=4000,
        messages=[
            {
                "role": "user",
                "content": f"""你是严格的 QA 和代码审查专家。评估以下代码实现：

规格：
{spec}

生成的代码：
{generated_code}

评分标准：
{grading_criteria}

请提供：
1. 每个标准的评分（满分10分）
2. 具体的缺陷和问题
3. 改进建议（优先级排序）
4. 是否通过审查（所有标准需>7分）

要求：
- 不要过度赞美代码，要客观评估
- 主要关注实现的正确性和完整性
- 列出具体的代码行号和问题
"""
            }
        ]
    )
    return response.content[0].text
```

---

## 3. 循环系统：迭代改进

```python
def run_full_harness(user_prompt, max_iterations=3):
    """
    完整的 Harness 执行流程
    """
    print("=== PLANNER ===")
    spec = run_planner(user_prompt)
    print(spec[:500] + "...")
    
    code = None
    for iteration in range(max_iterations):
        print(f"\n=== GENERATOR (Iteration {iteration + 1}) ===")
        code = run_generator(spec, code)
        
        print(f"\n=== EVALUATOR (Iteration {iteration + 1}) ===")
        grading_criteria = """
        - 功能完整性：所有规格功能是否都实现了？
        - 代码质量：代码是否干净、可维护？
        - 错误处理：是否有适当的错误处理和验证？
        """
        evaluation = run_evaluator(spec, code, grading_criteria)
        print(evaluation[:500] + "...")
        
        # 如果质量足够好，停止迭代
        if "通过审查" in evaluation or iteration == max_iterations - 1:
            break
    
    return spec, code, evaluation
```

---

## 4. 实际使用示例

```python
# 简单的项目描述
prompt = "Create a collaborative todo app with AI-powered task suggestions"

# 运行完整的 Harness
spec, code, final_eval = run_full_harness(prompt, max_iterations=3)

# 保存结果
with open("spec.md", "w") as f:
    f.write(spec)

with open("app.py", "w") as f:
    f.write(code)

with open("evaluation.md", "w") as f:
    f.write(final_eval)

print("✅ Harness 执行完成！")
print(f"规格已保存: spec.md")
print(f"代码已保存: app.py")
print(f"评估已保存: evaluation.md")
```

---

## 5. 最佳实践

### ✅ 要做
1. **清晰的评分标准**：让评估者有具体的标准而非模糊的判断
2. **结构化沟通**：使用文件和明确的格式在代理间传递信息
3. **上下文重置**：长任务中定期清空上下文，用结构化的状态切换
4. **专业化角色**：每个代理有清晰的职责边界
5. **迭代反馈**：评估者的反馈要具体到代码行号和特定问题

### ❌ 不要做
1. ❌ 让模型自我评估——它会过度乐观
2. ❌ 在一个提示中做所有事情——分离职责提高质量
3. ❌ 用模糊的标准——"好的代码"不如"通过以下10个检查清单"
4. ❌ 忽视上下文长度——定期监控和重置

---

## 6. 成本优化

从文章的例子来看：
- **基础 Harness**：可能需要 $100-200（多轮迭代）
- **优化方法**：
  - 使用 Sonnet 4.5（成本低于 Opus 4.6）
  - 减少不必要的迭代
  - 仅在真正需要时运行 Evaluator
  - 明确定义"完成"标准避免无限迭代

---

## 7. 集成到你的项目工作流

```bash
# 项目结构
my_project/
├── harness/
│   ├── planner.py
│   ├── generator.py
│   ├── evaluator.py
│   └── orchestrator.py (主控制逻辑)
├── output/
│   ├── spec.md
│   ├── code/
│   └── evaluation.md
└── requirements.txt
```

你可以在 CI/CD 管道中集成：
```yaml
# GitHub Actions 示例
- name: Run AI Harness
  run: python harness/orchestrator.py --prompt "Your spec" --iterations 3
```

---

## 8. 下一步

1. **从小开始**：用简单项目测试
2. **微调提示**：根据你的特定需求调整 Planner/Generator/Evaluator 提示
3. **监控成本**：跟踪 token 使用情况
4. **收集反馈**：评估结果，调整标准和权重
5. **扩展能力**：添加特定领域的工具（如 Playwright 进行 UI 测试）
