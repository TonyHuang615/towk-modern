#!/bin/bash
#
# docker-deploy.sh — TOWK Harness Engineering
#
# Architecture (per harness-implementation-guide.md):
#   Generator  → Claude Code writes/edits frontend files
#   Deploy     → docker compose build + up
#   Evaluator  → E2E tests (e2e-test.js): all pages + button interactions
#   Visual QA  → Agent hook reads screenshots from E2E run
#
# Triggered by: Claude Code Stop hook (on every assistant turn)
#

set -euo pipefail

INPUT=$(cat)
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"

# Prevent recursive Stop hook invocation
STOP_HOOK_ACTIVE=$(echo "$INPUT" | jq -r '.stop_hook_active // false')
if [ "$STOP_HOOK_ACTIVE" = "true" ]; then
  exit 0
fi

# Only trigger on frontend changes
LAST_MSG=$(echo "$INPUT" | jq -r '.last_assistant_message // empty')
if ! echo "$LAST_MSG" | grep -qiE '(apps/web|component|page\.tsx|layout\.tsx|globals\.css|tailwind|next\.config|Dockerfile|tsx|\.css)'; then
  exit 0
fi

echo "──────────────────────────────────────" >&2
echo " TOWK Harness: 检测到前端变更" >&2
echo "──────────────────────────────────────" >&2

cd "$PROJECT_DIR"

# ── Step 1: Build (Generator output → deployable image) ──────────────────
echo "[1/4] 构建 Docker 镜像..." >&2
if ! docker compose build web 2>&1 >&2; then
  echo "❌ Docker 构建失败" >&2
  exit 2
fi

# ── Step 2: Deploy ────────────────────────────────────────────────────────
echo "[2/4] 启动容器..." >&2
docker compose up -d web 2>&1 >&2

# ── Step 3: Health gate ───────────────────────────────────────────────────
echo "[3/4] 等待容器健康检查..." >&2
MAX_WAIT=90
WAITED=0
while [ $WAITED -lt $MAX_WAIT ]; do
  S=$(docker inspect --format='{{.State.Health.Status}}' towk-web 2>/dev/null || echo "starting")
  case "$S" in
    healthy)
      echo "✓ 容器健康" >&2
      break
      ;;
    unhealthy)
      echo "❌ 健康检查失败" >&2
      docker logs towk-web --tail 30 >&2
      exit 2
      ;;
  esac
  sleep 3
  WAITED=$((WAITED + 3))
done

if [ $WAITED -ge $MAX_WAIT ]; then
  echo "❌ 等待超时 (${MAX_WAIT}s)" >&2
  exit 2
fi

HTTP_CODE=$(curl -o /dev/null -s -w "%{http_code}" --max-time 10 http://localhost:3000)
if [ "$HTTP_CODE" != "200" ]; then
  echo "❌ HTTP 检查失败：$HTTP_CODE" >&2
  exit 2
fi
echo "✓ HTTP 200 OK" >&2

# ── Step 4: Evaluator — E2E tests (button interactions) ──────────────────
echo "[4/5] 运行 E2E 测试（按钮 & 交互验证）..." >&2

E2E_RESULT_FILE="$PROJECT_DIR/.claude/screenshots/e2e-result.txt"
mkdir -p "$(dirname "$E2E_RESULT_FILE")"

if command -v node &>/dev/null; then
  node "$PROJECT_DIR/.claude/hooks/e2e-test.js" \
    "http://localhost:3000" \
    "/tmp/e2e-shots" 2>&1 | tee "$E2E_RESULT_FILE" >&2
  E2E_EXIT=${PIPESTATUS[0]}

  if [ $E2E_EXIT -eq 0 ]; then
    echo "✓ E2E 全部通过" >&2
  else
    echo "❌ E2E 有失败项，详见 $E2E_RESULT_FILE" >&2
  fi
else
  echo "⚠️  未找到 node，跳过 E2E 测试" >&2
fi

# ── Step 5: 在 Chrome 中打开页面（由 Claude extension 做视觉检查）──────────
echo "[5/5] 在 Chrome 中打开页面..." >&2
open -a "Google Chrome" "http://localhost:3000" 2>/dev/null \
  || open "http://localhost:3000" 2>/dev/null \
  || echo "⚠️  无法自动打开 Chrome，请手动访问 http://localhost:3000" >&2

echo "──────────────────────────────────────" >&2
echo "✓ 部署完成：http://localhost:3000" >&2
echo "  请使用 Chrome Claude extension 进行视觉检查" >&2
echo "──────────────────────────────────────" >&2
exit 0
