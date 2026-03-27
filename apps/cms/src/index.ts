// Strapi application lifecycle hooks
export default {
  register(/* { strapi } */) {},

  async bootstrap({ strapi }) {
    // Create default admin user if none exists
    const adminCount = await strapi.db
      .query("admin::user")
      .count();

    if (adminCount === 0) {
      const superAdminRole = await strapi.db
        .query("admin::role")
        .findOne({ where: { code: "strapi-super-admin" } });

      if (superAdminRole) {
        const hashedPassword = await strapi.admin.services.auth.hashPassword(
          "TowkAdmin2026!"
        );
        await strapi.db.query("admin::user").create({
          data: {
            firstname: "TOWK",
            lastname: "Admin",
            email: "admin@towk.sg",
            password: hashedPassword,
            isActive: true,
            blocked: false,
            roles: [superAdminRole.id],
          },
        });
        strapi.log.info("✅ Default admin user created: admin@towk.sg / TowkAdmin2026!");
      }
    }

    // Seed site config if empty
    const siteConfigCount = await strapi.db
      .query("api::site-config.site-config")
      .count();

    if (siteConfigCount === 0) {
      await strapi.db.query("api::site-config.site-config").create({
        data: {
          siteName: "新加坡东安会馆",
          siteNameEn: "Tung On Wui Kun",
          address: "21 Bukit Pasoh Road, Singapore 089835",
          phone: "+65 6223 4416",
          email: "info@towk.sg",
          facebook: "https://www.facebook.com/tungonwuikun",
        },
      });
      strapi.log.info("✅ Site config seeded");
    }

    // Seed articles if empty
    const articleCount = await strapi.db
      .query("api::article.article")
      .count();

    if (articleCount === 0) {
      const articles = [
        {
          title: "新加坡东安会馆2026年春茗晚宴圆满举行",
          slug: "2026-spring-banquet",
          excerpt: "2026年春茗晚宴于本月圆满举行，逾三百名乡亲出席，共叙乡情，展望新一年的发展蓝图。",
          content:
            "新加坡东安会馆2026年春茗晚宴于3月15日在会馆礼堂隆重举行，逾三百名乡亲齐聚一堂，共叙乡情。\n\n会长在致辞中回顾了过去一年会馆的各项成就，展望了新一年的发展蓝图，并感谢各位乡亲的大力支持。\n\n晚宴期间，会馆粤剧组呈献了精彩的粤曲表演，青年团也带来了富有活力的节目，现场气氛热烈，宾主尽欢。",
          category: "会馆公告",
          date: "2026-03-15",
          author: "东安会馆",
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
        {
          title: "粤剧组新春贺岁演出获得热烈反响",
          slug: "cny-opera-performance",
          excerpt: "会馆粤剧组于农历新年期间在牛车水文化广场呈献精彩粤剧折子戏，吸引大批观众，广受好评。",
          content:
            "东安会馆粤剧组「东安梨艺社」于农历新年期间在牛车水文化广场呈献精彩粤剧折子戏，吸引数百名观众驻足欣赏。\n\n此次演出精选了多出经典粤剧名段，包括《帝女花》《紫钗记》等，演员们的精湛表演赢得了观众的热烈掌声。\n\n粤剧组成立于1943年，1947年正式命名为「东安梨艺社」，至今已有超过80年的历史，是新加坡华人社区中传承粤剧文化的重要力量。",
          category: "文化活动",
          date: "2026-02-05",
          author: "东安会馆",
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
        {
          title: "青年团赴广东东莞交流考察活动顺利完成",
          slug: "youth-dongguan-trip",
          excerpt: "会馆青年团一行二十人赴祖籍地广东东莞进行文化交流考察，深入了解家乡发展，增强归属感与认同感。",
          content:
            "新加坡东安会馆青年团一行二十人于1月中旬赴祖籍地广东东莞进行为期五天的文化交流考察活动。\n\n行程涵盖参观东莞博物馆、可园等历史文化景点，走访当地新兴科技园区，并与东莞青年联合会进行座谈交流。\n\n此行加深了青年团成员对祖籍地发展的认知与了解，许多团员表示对家乡的飞速发展感到骄傲，期待日后有更多回乡交流的机会。",
          category: "青年活动",
          date: "2026-01-20",
          author: "东安会馆",
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
      ];

      for (const article of articles) {
        await strapi.db.query("api::article.article").create({ data: article });
      }
      strapi.log.info("✅ 3 articles seeded");
    }

    // Seed activities if empty
    const activityCount = await strapi.db
      .query("api::activity.activity")
      .count();

    if (activityCount === 0) {
      const activities = [
        {
          title: "粤剧组",
          slug: "cantonese-opera",
          subtitle: "CANTONESE OPERA",
          description: "传承岭南戏曲文化，东安梨艺社成立于1947年，定期公演弘扬传统艺术。",
          content:
            "东安会馆粤剧组「东安梨艺社」成立于1947年，是新加坡华人社区中传承粤剧文化的重要力量。\n\n粤剧组每周定期排练，由资深演员指导新人，传承粤剧唱腔、做功、身段等表演艺术。\n\n每年农历新年期间，粤剧组会在牛车水文化广场等场所公开演出，并积极参与各类慈善义演活动。",
          icon: "Music",
          highlights: JSON.stringify(["每周定期排练与演出", "传承岭南传统戏曲文化", "积极参与社区慈善义演", "培养新一代粤剧传承人"]),
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
        {
          title: "商务交流",
          slug: "business",
          subtitle: "BUSINESS EXCHANGE",
          description: "促进乡亲商业合作，联结新加坡与东莞之间的贸易纽带。",
          content:
            "东安会馆定期组织商务交流活动，联结新加坡与东莞之间的贸易纽带。\n\n活动包括商务晚宴、投资论坛、企业参访等，为乡亲们提供商业合作和投资机会。\n\n会馆还与新加坡东莞工商总会紧密合作，推动双边经贸往来，服务乡亲企业家。",
          icon: "Briefcase",
          highlights: JSON.stringify(["每季度举办商务交流会", "组织赴东莞商务考察团", "搭建新莞商贸合作桥梁", "提供商业咨询与投资对接"]),
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
        {
          title: "青年活动",
          slug: "youth",
          subtitle: "YOUTH ACTIVITIES",
          description: "培养青年接班人，组织祖籍地交流考察，传承东安精神。",
          content:
            "东安会馆青年团致力于凝聚年轻一代，培养未来会馆接班人。\n\n青年团定期组织各类活动，包括祖籍地交流考察、文化讲座、联谊活动等。\n\n通过这些活动，青年团员们不仅增强了对祖籍文化的认同感，也拓展了人脉和视野。",
          icon: "Users",
          highlights: JSON.stringify(["每月举办青年聚会与交流", "每年组织祖籍地考察之旅", "开展文化传承与学习活动", "提供青年领导力培训"]),
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
        {
          title: "传统节庆",
          slug: "traditions",
          subtitle: "TRADITIONAL FESTIVALS",
          description: "庆祝春节、中秋等传统节日与会馆周年庆典，凝聚乡情。",
          content:
            "东安会馆每年举办多项传统节日庆祝活动，包括春节联欢晚会、中秋博饼会、重阳敬老等。\n\n这些活动不仅让乡亲们在异国他乡也能感受到浓浓的节日氛围，更加深了乡亲之间的情感联系。\n\n会馆还定期举办周年庆典，回顾发展历程，展望美好未来。",
          icon: "Sparkles",
          highlights: JSON.stringify(["春节联欢晚会", "中秋博饼会", "重阳敬老活动", "会馆周年庆典"]),
          publishedAt: new Date().toISOString(),
          locale: "zh",
        },
      ];

      for (const activity of activities) {
        await strapi.db.query("api::activity.activity").create({ data: activity });
      }
      strapi.log.info("✅ 4 activities seeded");
    }

    // Seed albums if empty
    const albumCount = await strapi.db
      .query("api::album.album")
      .count();

    if (albumCount === 0) {
      const albums = [
        { title: "第11届世界东安恳亲大会", category: "恳亲大会", date: "2019", publishedAt: new Date().toISOString() },
        { title: "粤剧组年度公演", category: "文化活动", date: "2025", publishedAt: new Date().toISOString() },
        { title: "青年团东莞交流之旅", category: "青年活动", date: "2026", publishedAt: new Date().toISOString() },
        { title: "中秋联欢晚会", category: "日常活动", date: "2025", publishedAt: new Date().toISOString() },
      ];

      for (const album of albums) {
        await strapi.db.query("api::album.album").create({ data: album });
      }
      strapi.log.info("✅ 4 albums seeded");
    }
  },

  destroy(/* { strapi } */) {},
};
