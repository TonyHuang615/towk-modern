// 活动数据：短字段（标题/描述/亮点）双语；长正文 content 暂为中文，待补英文。
type Loc = { zh: string; en: string };

interface RawActivity {
  slug: string;
  subtitle: string;
  icon: string;
  image: string;
  title: Loc;
  description: Loc;
  content: string;
  highlights: { zh: string[]; en: string[] };
}

export interface Activity {
  slug: string;
  title: string;
  subtitle: string;
  icon: string;
  image: string;
  description: string;
  content: string;
  highlights: string[];
}

const rawActivities: RawActivity[] = [
  {
    slug: "cantonese-opera",
    subtitle: "Cantonese Opera Group",
    icon: "Music",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=900&q=80",
    title: { zh: "粤剧组", en: "Cantonese Opera Group" },
    description: {
      zh: "传承岭南戏曲文化，弘扬传统艺术，定期排练演出。",
      en: "Preserving Lingnan opera culture and traditional arts through regular rehearsals and performances.",
    },
    content: `东安会馆粤剧组成立于1943年，是新加坡历史最悠久的粤剧团体之一。初创时期，会员们怀着对故乡文化的眷恋，以简单的器材开始排练，以粤剧曲艺凝聚乡情、慰藉在外乡亲。

1947年，粤剧组正式成立「东安梨艺社」，组织架构日趋完善。1960至70年代，随着成员增多、设备改善，粤剧组开始参与各类慈善义演，在公开舞台上为观众呈献精彩演出。

1990年代起，粤剧组多次邀请中国大陆专业教师来新授课，大幅提升了整体艺术水准。2004年，粤剧组赴广州参加「羊城国际粤剧节」，并前往湛江进行文化交流演出，进一步拓展了与祖籍地的文化联系。

多年来，东安会馆粤剧组坚持定期公演，持续开班授课，培育本地粤剧人才，为粤剧艺术在海外的薪火相传作出积极贡献。粤剧被联合国教科文组织列为人类非物质文化遗产，东安梨艺社将继续守护这一珍贵的文化传承。`,
    highlights: {
      zh: [
        "成立于1943年，1947年正式成立东安梨艺社",
        "定期公演粤剧折子戏及粤曲晚会",
        "开设粤剧培训班，传授声腔与表演技艺",
        "曾赴广州参加羊城国际粤剧节（2004年）",
        "多次邀请中国专业演员来新交流演出",
      ],
      en: [
        "Founded in 1943; the Tung On Lei Ngai Society formally established in 1947",
        "Regular performances of Cantonese opera excerpts and recitals",
        "Runs training classes in vocals and stagecraft",
        "Performed at the Guangzhou International Cantonese Opera Festival (2004)",
        "Hosts professional performers from China for exchange shows",
      ],
    },
  },
  {
    slug: "business",
    subtitle: "Business & Overseas Exchange",
    icon: "Briefcase",
    image:
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80",
    title: { zh: "商务交流", en: "Business Exchange" },
    description: {
      zh: "促进乡亲商业合作，搭建新加坡与东莞之间的贸易桥梁。",
      en: "Fostering business cooperation among members and bridging trade between Singapore and Dongguan.",
    },
    content: `东安会馆商务交流活动致力于联结新加坡与祖籍地广东东莞、宝安之间的商业纽带，促进两地乡亲在经贸领域的合作与发展。

2003年，东安会馆进一步创办「新加坡东莞工商总会」，为两地工商人士搭建更专业的交流平台，推动双边贸易与投资合作。

商务交流活动涵盖多个地区，包括新加坡、广东东莞、深圳、香港及马来西亚等地，通过定期举办商务考察、交流访问及联谊活动，帮助会员拓展业务网络，发掘合作商机。

东安会馆的商务交流活动承载着「以乡情促商情」的理念，将同乡情谊与商业合作有机结合，为会员创造实质性的商业价值。`,
    highlights: {
      zh: [
        "2003年创办新加坡东莞工商总会",
        "定期组织赴东莞、深圳商务考察团",
        "联结新加坡、香港、马来西亚东安乡商",
        "举办商务交流晚宴与行业论坛",
        "协助会员拓展东南亚及大湾区业务",
      ],
      en: [
        "Founded the Singapore Dongguan Chamber of Commerce in 2003",
        "Organises business missions to Dongguan and Shenzhen",
        "Connects Tung On business owners in Singapore, Hong Kong and Malaysia",
        "Hosts business networking dinners and industry forums",
        "Helps members expand across Southeast Asia and the Greater Bay Area",
      ],
    },
  },
  {
    slug: "youth",
    subtitle: "Youth Activities",
    icon: "Users",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80",
    title: { zh: "青年活动", en: "Youth Activities" },
    description: {
      zh: "培养青年接班人，传承东安精神，联结新生代乡亲。",
      en: "Nurturing young successors, passing on the Tung On spirit and connecting the new generation.",
    },
    content: `东安会馆青年活动组致力于凝聚第二代、第三代东安乡亲，让年轻一代认识祖籍文化，传承东安精神，并在彼此之间建立深厚的友谊与认同感。

青年团定期举办各类联谊活动，包括聚餐、旅行、体育比赛及文化体验活动，为年轻成员提供轻松愉快的社交平台。

祖籍地交流是青年活动的重要组成部分。青年团定期组团赴广东东莞进行文化考察与交流，亲身感受家乡的历史文化与现代发展，加深对自身根源的认同与了解。

东安会馆鼓励青年积极参与会馆事务，通过志愿服务、活动筹办等途径，培养青年的领导力与服务精神，为会馆的可持续发展注入新生力量。`,
    highlights: {
      zh: [
        "定期举办青年联谊及文化活动",
        "组织赴广东东莞祖籍地文化交流考察",
        "参与会馆节庆活动筹备与志愿服务",
        "青年领袖培训与接班人计划",
        "跨代交流，连结长辈与新生代乡亲",
      ],
      en: [
        "Regular youth gatherings and cultural activities",
        "Cultural exchange visits to ancestral Dongguan, Guangdong",
        "Helps organise association festivals and volunteers",
        "Youth leadership training and succession programme",
        "Intergenerational exchange linking elders and the new generation",
      ],
    },
  },
  {
    slug: "traditions",
    subtitle: "Traditions & Celebrations",
    icon: "Sparkles",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=900&q=80",
    title: { zh: "传统节庆", en: "Traditions & Celebrations" },
    description: {
      zh: "庆祝传统节日与会庆，凝聚乡情，共襄盛举。",
      en: "Celebrating traditional festivals and anniversaries to bring members together.",
    },
    content: `东安会馆每年举办多项传统节庆活动，以华人传统节日为纽带，凝聚旅居海外的乡亲，让大家在异乡也能感受到浓浓的文化认同与家园情怀。

春茗晚宴是每年最重要的传统活动之一，每届均吸引数百名乡亲出席，在新年伊始共叙乡情，展望新一年的发展。中秋联欢晚会则以月圆人团圆为主题，文艺表演精彩纷呈，气氛融洽。

会馆周年纪念庆典是另一项重要传统活动，每届庆典均邀请各友好社团代表出席，回顾会馆历史成就，展望未来发展方向。

东安会馆恪守「东安传统」，以传统礼俗与文化习俗为纽带，让每一位乡亲在活动中感受到属于东安人的共同记忆与文化认同。`,
    highlights: {
      zh: [
        "每年举办春茗晚宴，逾三百名乡亲出席",
        "中秋联欢晚会，文艺节目精彩纷呈",
        "会馆周年庆典，回顾历史、展望未来",
        "清明祭祖，传承慎终追远的传统美德",
        "节庆期间举办文艺演出及亲子活动",
      ],
      en: [
        "Annual Spring Banquet with over 300 members attending",
        "Mid-Autumn gala with a rich variety of performances",
        "Anniversary celebrations reflecting on history and looking ahead",
        "Qingming ancestral rites honouring our forebears",
        "Festival performances and family activities",
      ],
    },
  },
];

function pick(loc: Loc, locale: string): string {
  return locale === "en" ? loc.en : loc.zh;
}

export function getLocalizedActivities(locale: string): Activity[] {
  return rawActivities.map((a) => ({
    slug: a.slug,
    subtitle: a.subtitle,
    icon: a.icon,
    image: a.image,
    title: pick(a.title, locale),
    description: pick(a.description, locale),
    content: a.content,
    highlights: locale === "en" ? a.highlights.en : a.highlights.zh,
  }));
}

export function getActivityBySlug(
  slug: string,
  locale: string,
): Activity | undefined {
  return getLocalizedActivities(locale).find((a) => a.slug === slug);
}
