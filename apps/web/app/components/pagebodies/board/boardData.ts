// 理事会名册数据。职衔走 i18n（board.positions.*）；人名为专有名词，
// 两种语言均保留中文。所有 design 版面共用此数据，保证名册一致。

export interface BoardMember {
  key: string;
  names: string[];
}

export interface BoardTerm {
  termNo: number;
  years: string;
  president: string;
  members: BoardMember[];
}

export const boardTerms: BoardTerm[] = [
  {
    termNo: 139,
    years: "2017–2019",
    president: "洪广方",
    members: [
      { key: "honoraryPresidentForLife", names: ["刘荫稳博士"] },
      { key: "honoraryPresident", names: ["刘锦纬", "陈华昌", "何国才"] },
      { key: "honoraryChairman", names: ["刘瑞星", "何宝葵", "洪广方", "李俊雄"] },
      { key: "president", names: ["洪广方"] },
      { key: "vicePresident", names: ["尹绍初", "何开叶", "张鸿强"] },
      { key: "trustee", names: ["陈华昌", "洪广发"] },
      { key: "generalAffairs", names: ["刘瑞星", "王锦顺", "郭丽明"] },
      { key: "deputyGeneralAffairs", names: ["刘炳源", "刘丽萍", "郑贵全"] },
      { key: "treasurer", names: ["尹绍初", "李俊雄", "刘积田", "刘泽森"] },
      { key: "deputyTreasurer", names: ["陈坚求", "王照明", "刘锦纬", "叶飞飞"] },
      { key: "liaison", names: ["何开业", "张鸿强"] },
      { key: "cantoneseOpera", names: ["刘玉枝", "郭丽明"] },
      { key: "women", names: ["洪秋云", "刘丽萍"] },
      { key: "youth", names: ["叶飞飞", "王锦顺"] },
      { key: "auditor", names: ["刘亚金", "洪顺有"] },
      {
        key: "businessAdvisor",
        names: ["刘荫稳", "何汉章", "刘伟燊", "江新明", "卢权培"],
      },
      { key: "medicalAdvisor", names: ["江新明"] },
      { key: "legalAdvisor", names: ["叶树贤"] },
    ],
  },
  {
    termNo: 138,
    years: "2015–2016",
    president: "何宝葵",
    members: [
      { key: "honoraryPresidentForLife", names: ["刘荫稳博士"] },
      { key: "honoraryPresident", names: ["何汉章", "何国才", "刘积田"] },
      { key: "president", names: ["何宝葵"] },
      {
        key: "vicePresident",
        names: ["尹绍初", "陈华昌", "洪顺有", "叶海通", "何国才", "刘积田"],
      },
      { key: "generalAffairs", names: ["陈丽贤"] },
      { key: "deputyGeneralAffairs", names: ["刘瑞星"] },
      { key: "treasurer", names: ["何国才", "王锦顺"] },
      { key: "deputyTreasurer", names: ["刘泽森", "陈丽贤"] },
      { key: "auditor", names: ["刘丽萍"] },
      { key: "cantoneseOpera", names: ["刘玉枝", "刘锡昌"] },
      { key: "women", names: ["刘素霞", "郭彩英"] },
      { key: "legalAdvisor", names: ["叶树贤 PBM"] },
      { key: "medicalAdvisor", names: ["江新明医生"] },
    ],
  },
];
