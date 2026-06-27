// 演示模式：5 套前端设计风格。内容完全一致，仅切换视觉风格（CSS 变量主题）。
export interface DesignOption {
  id: string;
  name: string; // 中文名
  nameEn: string;
  swatch: [string, string]; // 两个代表色，用于按钮上的色块预览
  description: string; // hover 说明（100–200 字，以东安会馆为例）
}

export const DESIGN_STORAGE_KEY = "towk-design";
export const DEFAULT_DESIGN = "classic";

export const DESIGNS: DesignOption[] = [
  {
    id: "classic",
    name: "经典传承",
    nameEn: "Classic Heritage",
    swatch: ["#C0392B", "#D4A017"],
    description:
      "经典传承以朱红与鎏金为主色，衬以思源宋体的端庄笔锋，呼应东安会馆自1876年传承至今的百年底蕴。这种庄重典雅的视觉语言，让会馆的历史里程碑、世界恳亲大会与粤剧文化自带仪式感，唤起乡亲对家国情怀与传统礼俗的认同，最适合呈现具有厚重历史分量的内容。",
  },
  {
    id: "paper",
    name: "宣纸书卷",
    nameEn: "Rice-Paper Editorial",
    swatch: ["#5A1A14", "#D4A017"],
    description:
      "宣纸书卷以暖奶白为纸、朱红与鎏金为印，衬以衬线标题与疏朗版式，仿佛一卷徐徐展开的会馆志。用于东安会馆，它把1876年以来的历史、世界恳亲大会与粤剧传承娓娓道来，文字与照片在留白中呼吸，既有书卷的儒雅，又不失印章般的庄重，最适合静心品读会馆故事与文化篇章。",
  },
  {
    id: "editorial",
    name: "暖陶编辑",
    nameEn: "Warm Editorial",
    swatch: ["#C2613F", "#1A1A1A"],
    description:
      "暖陶编辑取法当代杂志的编辑美学，以象牙白为底、暖陶土色点睛，衬线标题搭配克制的无衬线正文，营造理性而温润的阅读质感。对东安会馆而言，它让会务介绍、新闻动态与组织架构呈现出专业、清晰、值得信赖的编辑气质，弱化喧哗、突出内容，特别适合面向海外读者与媒体的正式呈现。",
  },
  {
    id: "vibrant",
    name: "活力社群",
    nameEn: "Vibrant Community",
    swatch: ["#F97316", "#14B8A6"],
    description:
      "活力社群以明快的橙绿撞色、圆润饱满的卡片与充裕留白，传递温暖亲切、朝气蓬勃的社群气息。对东安会馆来说，它特别契合青年活动、会员联谊与节庆盛事的呈现，拉近与新生代乡亲的距离，鼓励年轻人参与会务，让走过百年的会馆展现出面向未来、生生不息的活力面貌。",
  },
  {
    id: "stately",
    name: "庄重典藏",
    nameEn: "Stately Archive",
    swatch: ["#D4AF37", "#14142A"],
    description:
      "庄重典藏以深邃墨蓝为底、低调金色为饰，宛如博物馆典藏展厅的陈列语言，肃穆而尊贵。用于东安会馆，它让历届理事会名录、组织架构与重大史实显得庄严郑重，强化机构的公信力与历史地位，最适合呈现需要被珍重对待、值得长久铭记的会馆典章、荣誉与百年传承。",
  },
];
