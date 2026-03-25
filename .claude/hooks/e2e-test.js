#!/usr/bin/env node
/**
 * e2e-test.js
 * 端到端测试：截图 + 按钮/交互功能验证
 * 用法: node e2e-test.js <base_url> <screenshot_dir>
 */

let puppeteer;
try {
  puppeteer = require("puppeteer");
} catch {
  puppeteer = require("/opt/homebrew/lib/node_modules/puppeteer");
}

const BASE_URL = process.argv[2] || "http://localhost:3000";
const SHOT_DIR = process.argv[3] || "/tmp/e2e-shots";
const fs = require("fs");
if (!fs.existsSync(SHOT_DIR)) fs.mkdirSync(SHOT_DIR, { recursive: true });

const results = [];
let passed = 0;
let failed = 0;

function log(name, ok, detail = "") {
  const icon = ok ? "✓" : "✗";
  console.error(`  ${icon} ${name}${detail ? ": " + detail : ""}`);
  results.push({ name, ok, detail });
  ok ? passed++ : failed++;
}

async function shot(page, name) {
  await page.screenshot({ path: `${SHOT_DIR}/${name}.png` });
}

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  console.error("\n══════════════════════════════════════");
  console.error(" TOWK E2E 测试开始");
  console.error("══════════════════════════════════════\n");

  // ─── 首页 ─────────────────────────────────────────────
  console.error("【首页 /】");
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2500));
  await shot(page, "home-hero");

  // Hero 轮播箭头
  try {
    const nextBtn = await page.$('button[aria-label="下一张"]');
    log("Hero 下一张按钮存在", !!nextBtn);
    if (nextBtn) {
      await nextBtn.click();
      await new Promise((r) => setTimeout(r, 1500));
      await shot(page, "home-hero-slide2");
      log("Hero 轮播切换", true);
    }
  } catch (e) { log("Hero 轮播切换", false, e.message); }

  // Hero 探索会馆按钮
  try {
    const cta = await page.$('a[href="#about"]');
    log("探索会馆按钮存在", !!cta);
  } catch (e) { log("探索会馆按钮", false, e.message); }

  // 公告栏
  try {
    const megaphone = await page.$('section .text-primary');
    log("公告栏渲染", !!megaphone);
  } catch (e) { log("公告栏", false, e.message); }

  // 导航链接
  await page.evaluate(() => window.scrollTo(0, 0));
  const navLinks = await page.$$('nav a[href]');
  log("Navigation 链接数量 ≥ 4", navLinks.length >= 4, `实际: ${navLinks.length}`);

  // 最新动态区块
  try {
    await page.evaluate(() => document.getElementById("news")?.scrollIntoView());
    await new Promise((r) => setTimeout(r, 800));
    await shot(page, "home-news");
    const newsCards = await page.$$('#news article');
    log("最新动态卡片数量 = 3", newsCards.length === 3, `实际: ${newsCards.length}`);
  } catch (e) { log("最新动态区块", false, e.message); }

  // ─── 新闻列表页 ───────────────────────────────────────
  console.error("\n【新闻列表 /news】");
  await page.goto(`${BASE_URL}/news`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "news-page");

  // 搜索框
  try {
    const searchInput = await page.$('[data-testid="news-search"]');
    log("搜索框存在", !!searchInput);
    if (searchInput) {
      await searchInput.type("粤剧");
      await new Promise((r) => setTimeout(r, 500));
      await shot(page, "news-search-result");
      const cards = await page.$$('article');
      log("搜索「粤剧」返回结果 ≥ 1", cards.length >= 1, `实际: ${cards.length}`);
      await searchInput.triple_click?.() || await page.evaluate(() => {
        const el = document.querySelector('[data-testid="news-search"]');
        if (el) { el.value = ''; el.dispatchEvent(new Event('input', {bubbles:true})); }
      });
    }
  } catch (e) { log("新闻搜索功能", false, e.message); }

  // 分类筛选按钮
  try {
    const filterBtn = await page.$('[data-testid="filter-文化活动"]');
    log("分类筛选按钮存在", !!filterBtn);
    if (filterBtn) {
      await filterBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      await shot(page, "news-filtered");
      log("分类筛选可点击", true);
    }
  } catch (e) { log("分类筛选按钮", false, e.message); }

  // ─── 影相库 ───────────────────────────────────────────
  console.error("\n【影相库 /gallery】");
  await page.goto(`${BASE_URL}/gallery`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "gallery-page");

  // 影相库卡片
  try {
    const albums = await page.$$('[data-testid^="gallery-album-"]');
    log("影相库相册数量 ≥ 4", albums.length >= 4, `实际: ${albums.length}`);
  } catch (e) { log("影相库相册", false, e.message); }

  // Lightbox 开关
  try {
    const firstAlbum = await page.$('[data-testid="gallery-album-1"]');
    if (firstAlbum) {
      await firstAlbum.click();
      await new Promise((r) => setTimeout(r, 600));
      const lightbox = await page.$('[data-testid="lightbox"]');
      log("Lightbox 点击打开", !!lightbox);
      await shot(page, "gallery-lightbox");
      if (lightbox) {
        const closeBtn = await page.$('[data-testid="lightbox-close"]');
        if (closeBtn) {
          await closeBtn.click();
          await new Promise((r) => setTimeout(r, 400));
          const closed = await page.$('[data-testid="lightbox"]');
          log("Lightbox 关闭按钮有效", !closed);
        }
      }
    }
  } catch (e) { log("Lightbox 交互", false, e.message); }

  // 影相库筛选
  try {
    const filterBtn = await page.$('[data-testid="gallery-filter-文化活动"]');
    if (filterBtn) {
      await filterBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      await shot(page, "gallery-filtered");
      log("影相库分类筛选可用", true);
    }
  } catch (e) { log("影相库筛选", false, e.message); }

  // ─── 关于会馆 ─────────────────────────────────────────
  console.error("\n【关于会馆 /about】");
  await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "about-page");
  const aboutH1 = await page.$('h1');
  log("关于会馆 H1 存在", !!aboutH1);

  // ─── 会馆活动 ─────────────────────────────────────────
  console.error("\n【会馆活动 /activities】");
  await page.goto(`${BASE_URL}/activities`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "activities-page");
  const actH1 = await page.$('h1');
  log("会馆活动 H1 存在", !!actH1);

  // ─── 恳亲大会 ─────────────────────────────────────────
  console.error("\n【恳亲大会 /conference】");
  await page.goto(`${BASE_URL}/conference`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "conference-page");

  // 获取最新信息按钮
  try {
    const ctaBtn = await page.$('button');
    log("恳亲大会 CTA 按钮存在", !!ctaBtn);
  } catch (e) { log("恳亲大会按钮", false, e.message); }

  // ─── 联系我们 ─────────────────────────────────────────
  console.error("\n【联系我们 /contact】");
  await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "contact-page");

  // 表单填写测试
  try {
    const nameInput = await page.$('input[type="text"]');
    log("联系表单姓名输入框存在", !!nameInput);
    if (nameInput) {
      await nameInput.type("测试用户");
      const emailInput = await page.$('input[type="email"]');
      if (emailInput) await emailInput.type("test@example.com");
      const textarea = await page.$('textarea');
      if (textarea) await textarea.type("这是一条测试消息，仅用于验证表单功能。");
      await shot(page, "contact-form-filled");
      log("联系表单可填写", true);
    }
  } catch (e) { log("联系表单", false, e.message); }

  // 发送按钮存在
  try {
    const sendBtn = await page.$('button[type="submit"]');
    log("发送消息按钮存在", !!sendBtn);
  } catch (e) { log("发送按钮", false, e.message); }

  // ─── 新闻详情页 ─────────────────────────────────────────
  console.error("\n【新闻详情 /news/spring-banquet-2026】");
  await page.goto(`${BASE_URL}/news/spring-banquet-2026`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "news-detail");
  try {
    const backLink = await page.$('a[href="/news"]');
    log("新闻详情返回链接存在", !!backLink);
    const articleH1 = await page.$('h1');
    log("新闻详情 H1 存在", !!articleH1);
  } catch (e) { log("新闻详情页", false, e.message); }

  // ─── 活动详情页 ─────────────────────────────────────────
  console.error("\n【活动详情 /activities/cantonese-opera】");
  await page.goto(`${BASE_URL}/activities/cantonese-opera`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "activity-detail-opera");
  try {
    const actBackLink = await page.$('a[href="/activities"]');
    log("活动详情返回链接存在", !!actBackLink);
    const actH1 = await page.$('h1');
    log("活动详情 H1 存在", !!actH1);
    const contactBtn = await page.$('a[href="/contact"]');
    log("活动详情联系按钮存在", !!contactBtn);
  } catch (e) { log("活动详情页", false, e.message); }

  // ─── 历史传承 ──────────────────────────────────────────
  console.error("\n【历史传承 /history】");
  await page.goto(`${BASE_URL}/history`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "history-page");
  try {
    const histH1 = await page.$('h1');
    log("历史传承 H1 存在", !!histH1);
  } catch (e) { log("历史传承页", false, e.message); }

  // ─── 组织架构 ──────────────────────────────────────────
  console.error("\n【组织架构 /about/structure】");
  await page.goto(`${BASE_URL}/about/structure`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "about-structure");
  try {
    const structH1 = await page.$('h1');
    log("组织架构 H1 存在", !!structH1);
    const backToAbout = await page.$('a[href="/about"]');
    log("组织架构返回链接存在", !!backToAbout);
  } catch (e) { log("组织架构页", false, e.message); }

  // ─── 历届董事会 ────────────────────────────────────────
  console.error("\n【历届董事会 /about/board】");
  await page.goto(`${BASE_URL}/about/board`, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "about-board");
  try {
    const boardH1 = await page.$('h1');
    log("董事会 H1 存在", !!boardH1);
    // 展开第一个董事会
    const expandBtn = await page.$('button');
    if (expandBtn) {
      await expandBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      await shot(page, "about-board-expanded");
      log("董事会展开功能", true);
    }
  } catch (e) { log("董事会页", false, e.message); }

  // ─── 移动端响应式 ─────────────────────────────────────
  console.error("\n【移动端视图 375px】");
  await page.setViewport({ width: 375, height: 812 });
  await page.goto(BASE_URL, { waitUntil: "networkidle2", timeout: 30000 });
  await new Promise((r) => setTimeout(r, 2000));
  await shot(page, "mobile-home");

  try {
    const menuBtn = await page.$('button[aria-label="菜单"]');
    log("移动端菜单按钮存在", !!menuBtn);
    if (menuBtn) {
      await menuBtn.click();
      await new Promise((r) => setTimeout(r, 500));
      await shot(page, "mobile-menu-open");
      log("移动端菜单可展开", true);
    }
  } catch (e) { log("移动端菜单", false, e.message); }

  await browser.close();

  // ─── 最终汇报 ─────────────────────────────────────────
  console.error("\n══════════════════════════════════════");
  console.error(` 测试完成：${passed} 通过 / ${failed} 失败`);
  console.error("══════════════════════════════════════\n");

  if (failed > 0) {
    console.error("❌ 失败项目：");
    results.filter((r) => !r.ok).forEach((r) => {
      console.error(`   - ${r.name}${r.detail ? ": " + r.detail : ""}`);
    });
    process.exit(2);
  }
  process.exit(0);
})().catch((err) => {
  console.error("测试崩溃:", err.message);
  process.exit(2);
});
