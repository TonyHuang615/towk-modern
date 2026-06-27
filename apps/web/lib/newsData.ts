// 新闻数据：短字段（分类/标题/摘要）双语；长正文 content 暂为中文，待补英文。
type Loc = { zh: string; en: string };

interface RawNews {
  id: number;
  slug: string;
  date: string;
  image: string;
  category: Loc;
  title: Loc;
  excerpt: Loc;
  content: string;
}

export interface NewsArticle {
  id: number;
  slug: string;
  date: string;
  category: string;
  categoryKey: string; // 稳定分类标识，用于筛选（与语言无关）
  title: string;
  excerpt: string;
  image: string;
  content: string;
}

const CATEGORY_KEYS: Record<string, string> = {
  会馆公告: "announcement",
  文化活动: "cultural",
  青年活动: "youth",
  社群服务: "community",
};

const rawNews: RawNews[] = [
  {
    id: 1,
    slug: "spring-banquet-2026",
    date: "2026-03-15",
    image:
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=900&q=80",
    category: { zh: "会馆公告", en: "Announcement" },
    title: {
      zh: "新加坡东安会馆2026年春茗晚宴圆满举行",
      en: "Tung On Wui Kun's 2026 Spring Banquet Held Successfully",
    },
    excerpt: {
      zh: "2026年春茗晚宴于本月圆满举行，逾三百名乡亲出席，共叙乡情，展望新一年的发展蓝图。",
      en: "The 2026 Spring Banquet was held this month with over 300 members attending to reconnect and look ahead to the new year.",
    },
    content: `
2026年春茗晚宴于本月15日在新加坡圆满举行，共有逾三百名乡亲出席，共叙乡情，展望新一年的发展蓝图。

晚宴上，会馆主席致辞，回顾东安会馆在过去一年的各项活动成果，并对各界乡亲的支持表示衷心感谢。席间举行了多项精彩文艺表演，包括粤剧组献唱及各类才艺节目，气氛热烈融洽。

本届春茗晚宴特别邀请了来自马来西亚、香港及中国大陆的东安乡亲代表出席，共同庆祝佳节，进一步加强了各地东安社团之间的联系与情谊。

东安会馆将继续秉承「敦睦乡谊、弘扬文化、服务社群」的宗旨，为广大乡亲提供更多活动与服务，欢迎各位乡亲积极参与。
    `.trim(),
  },
  {
    id: 2,
    slug: "cantonese-opera-cny-2026",
    date: "2026-02-28",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80",
    category: { zh: "文化活动", en: "Cultural" },
    title: {
      zh: "粤剧组新春贺岁演出获得热烈反响",
      en: "Cantonese Opera Group's Lunar New Year Performance Warmly Received",
    },
    excerpt: {
      zh: "会馆粤剧组于农历新年期间在牛车水文化广场呈献精彩粤剧折子戏，吸引大批观众，广受好评。",
      en: "During the Lunar New Year, the Cantonese Opera Group staged excerpts at Chinatown's cultural square, drawing large and appreciative crowds.",
    },
    content: `
东安会馆粤剧组于农历新年期间在牛车水文化广场呈献精彩粤剧折子戏，吸引大批观众驻足欣赏，广受好评。

东安会馆粤剧组成立于1943年，是本地历史最悠久的粤剧团体之一。1947年正式成立「东安梨艺社」，多年来持续为本地华人社区提供高质量的粤剧表演，同时积极开班授课，培育本地粤剧人才。

本次新春演出精选多个经典折子戏，包括《帝女花》、《紫钗记》等，演员们身着华丽戏服，唱做念打俱佳，令现场观众如痴如醉。演出结束后，观众报以热烈掌声，对粤剧组的精湛演技赞誉有加。

粤剧作为联合国非物质文化遗产，是岭南文化的重要组成部分。东安会馆粤剧组将持续努力，让这一传统艺术在海外得以薪火相传。
    `.trim(),
  },
  {
    id: 3,
    slug: "youth-dongguan-visit-2026",
    date: "2026-01-20",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    category: { zh: "青年活动", en: "Youth" },
    title: {
      zh: "青年团赴广东东莞交流考察活动顺利完成",
      en: "Youth Wing Completes Exchange Visit to Dongguan, Guangdong",
    },
    excerpt: {
      zh: "会馆青年团一行二十人赴祖籍地广东东莞进行文化交流考察，深入了解家乡发展。",
      en: "A 20-member youth delegation visited their ancestral home of Dongguan, Guangdong for a cultural exchange to learn about its development.",
    },
    content: `
东安会馆青年团一行二十人于今年一月赴祖籍地广东东莞进行为期五天的文化交流考察活动，圆满完成各项行程。

此次考察活动由会馆精心策划，旨在让年轻一代深入了解祖籍地的历史文化与现代发展。青年团参观了东莞当地的历史文化景点，走访了多家企业，并与当地的年轻人进行了深入交流。

通过此次考察，青年团成员不仅加深了对东莞历史文化的认识，更亲身感受到了家乡的飞速发展。多位青年团成员表示，此行让他们对自己的根有了更深的认同感，也对未来的发展充满了信心与期待。

东安会馆将继续组织类似的交流活动，让年轻一代与祖籍地保持紧密联系，传承东安文化与精神。
    `.trim(),
  },
  {
    id: 4,
    slug: "board-installation-2025",
    date: "2025-12-08",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=80",
    category: { zh: "会馆公告", en: "Announcement" },
    title: {
      zh: "东安会馆新届董事会就职典礼隆重举行",
      en: "Tung On Wui Kun's New Board Sworn In at Grand Ceremony",
    },
    excerpt: {
      zh: "新届董事会就职典礼于上月隆重举行，新届董事会将带领会馆迈向新的里程碑。",
      en: "The new board's installation ceremony was held last month; the incoming board will lead the association to new milestones.",
    },
    content: `
东安会馆新届董事会就职典礼于2025年12月8日隆重举行，多位社会贤达及各友好社团代表出席观礼，见证这一重要时刻。

典礼上，新届会长发表就职演词，表达对会馆前辈们多年来辛勤付出的敬意，并阐述了新届董事会的工作方向与施政蓝图，包括推动会馆数字化转型、加强青年工作、深化与各友好社团的合作等。

前届领导班子顺利移交会务，并获颁发纪念品以表彰多年来对会馆的贡献。现场气氛庄重热烈，众多乡亲见证了这一历史性时刻。

东安会馆将在新届领导班子的带领下，继续发扬百年历史的优良传统，为会员及社区提供更优质的服务。
    `.trim(),
  },
  {
    id: 5,
    slug: "senior-care-program-2025",
    date: "2025-11-15",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80",
    category: { zh: "社群服务", en: "Community" },
    title: {
      zh: "会馆长者关怀计划正式启动",
      en: "Association Launches Senior Care Programme",
    },
    excerpt: {
      zh: "东安会馆长者关怀计划正式启动，将定期组织活动关怀年长乡亲，促进世代交流。",
      en: "Tung On Wui Kun's senior care programme has launched, organising regular activities for elderly members and fostering intergenerational ties.",
    },
    content: `
东安会馆长者关怀计划于2025年11月正式启动，旨在关怀会馆内的年长乡亲，促进各世代之间的交流与联系。

此计划将定期举办各类活动，包括健康讲座、文化交流、长者聚餐等，为年长乡亲提供社交平台，让他们在异乡感受到家的温暖。

东安会馆历来重视对长者的关爱，自1946年起便设有互助部，为会员提供殡葬互助服务。此次长者关怀计划是在此基础上的进一步延伸，希望通过更系统化的方式，关照每一位年长乡亲。

欢迎有意参与志愿服务的会员踊跃报名，共同为长者提供关爱与陪伴。
    `.trim(),
  },
  {
    id: 6,
    slug: "mooncake-festival-2025",
    date: "2025-10-01",
    image:
      "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=900&q=80",
    category: { zh: "文化活动", en: "Cultural" },
    title: {
      zh: "东安会馆庆祝中秋联欢晚会成功举办",
      en: "Tung On Wui Kun's Mid-Autumn Gala Held Successfully",
    },
    excerpt: {
      zh: "中秋节联欢晚会吸引逾两百名乡亲出席，现场文艺表演精彩纷呈，气氛融洽。",
      en: "The Mid-Autumn gala drew over 200 members with a wonderful array of performances in a warm, convivial atmosphere.",
    },
    content: `
东安会馆中秋联欢晚会于2025年10月1日圆满举行，逾两百名乡亲出席，共庆佳节。

晚会现场布置典雅，充满中秋节气氛。各项精彩的文艺表演轮番上阵，包括粤剧演唱、民族舞蹈、歌唱表演等，令在场乡亲目不暇接。

主办方特别准备了精美的月饼礼盒，分赠与会乡亲，让大家在他乡也能感受到浓浓的节日气氛。现场还安排了亲子游戏和猜灯谜活动，吸引了众多携家带眷的会员踊跃参与。

中秋节是中华民族重要的传统节日，象征着团圆与和谐。东安会馆每年举办此类节庆活动，旨在凝聚乡亲情谊，传承中华文化，让海外华人社区保持对传统文化的认同与热爱。
    `.trim(),
  },
];

function pick(loc: Loc, locale: string): string {
  return locale === "en" ? loc.en : loc.zh;
}

export function getLocalizedNews(locale: string): NewsArticle[] {
  return rawNews.map((n) => ({
    id: n.id,
    slug: n.slug,
    date: n.date,
    image: n.image,
    category: pick(n.category, locale),
    categoryKey: CATEGORY_KEYS[n.category.zh] || "",
    title: pick(n.title, locale),
    excerpt: pick(n.excerpt, locale),
    content: n.content,
  }));
}

export function getArticleBySlug(
  slug: string,
  locale: string,
): NewsArticle | undefined {
  return getLocalizedNews(locale).find((a) => a.slug === slug);
}

export function formatDate(dateStr: string, locale: string = "zh") {
  return new Date(dateStr).toLocaleDateString(
    locale === "en" ? "en-GB" : "zh-CN",
    { year: "numeric", month: "long", day: "numeric" },
  );
}
