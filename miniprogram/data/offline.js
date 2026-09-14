/** 与 server/seed-data.js 同步的离线种子，保证开发者工具无网也能演示。 */
const jobs0914 = [
  {
    id: "j-20260914-01",
    title: "Senior Software Engineer, Infrastructure",
    company: "Google",
    logo: "G",
    locationZh: "加州 · 山景城",
    workModeZh: "混合办公",
    category: "software",
    categoryZh: "软件工程",
    visa: ["H-1B", "STEM OPT"],
    salaryMin: 180000,
    salaryMax: 260000,
    currency: "USD",
    level: "L5 / Senior",
    tags: ["Backend", "Distributed", "Go"],
    headline: "核心存储与调度，面向有大规模分布式经验的工程师。",
    description:
      "加入 Google Cloud 基础设施团队，参与存储调度与多租户隔离。团队本周开放补录，可走 H-1B 转让或 STEM OPT 转正。",
    requirements: [
      "5 年以上后端或基础设施经验",
      "熟悉分布式一致性与故障域设计",
      "Go 或 C++ 其一精通",
    ],
    applyUrl: "https://careers.google.com/",
    source: "Google Careers",
    isHighlight: true,
    digestDate: "2026-09-14",
  },
  {
    id: "j-20260914-02",
    title: "Staff Machine Learning Engineer",
    company: "OpenAI",
    logo: "O",
    locationZh: "加州 · 旧金山",
    workModeZh: "现场",
    category: "ai",
    categoryZh: "人工智能",
    visa: ["H-1B", "O-1"],
    salaryMin: 220000,
    salaryMax: 360000,
    currency: "USD",
    level: "Staff",
    tags: ["LLM", "Training", "Python"],
    headline: "训练与推理平台岗，今日薪酬与签证支持最高档。",
    description:
      "负责大模型训练编排、检查点与评估流水线。关键岗位提供 H-1B 与 O-1 双通道，要求每周四天旧金山现场。",
    requirements: [
      "参与过大规模训练或推理系统",
      "Python / CUDA 或 Triton 实践",
      "能把研究实验落成可复用平台",
    ],
    applyUrl: "https://openai.com/careers",
    source: "OpenAI Careers",
    isHighlight: true,
    digestDate: "2026-09-14",
  },
  {
    id: "j-20260914-03",
    title: "Quantitative Researcher",
    company: "Jane Street",
    logo: "J",
    locationZh: "纽约",
    workModeZh: "现场",
    category: "quant",
    categoryZh: "金融量化",
    visa: ["H-1B", "OPT"],
    salaryMin: 250000,
    salaryMax: 400000,
    currency: "USD",
    level: "New Grad / Experienced",
    tags: ["Research", "OCaml", "Statistics"],
    headline: "秋季研究岗补录，校招与社招同一通道。",
    description:
      "围绕电子交易与做市做假设、回测与上线评估。不强制金融背景。OPT / STEM OPT 本周优先约面。",
    requirements: [
      "扎实的概率统计与编程能力",
      "能独立完成从想法到回测的闭环",
      "OCaml / Python / C++ 任一熟练",
    ],
    applyUrl: "https://www.janestreet.com/join-jane-street/",
    source: "Jane Street",
    isHighlight: true,
    digestDate: "2026-09-14",
  },
];

const jobs0911 = [
  {
    id: "j-20260911-01",
    title: "Cloud Support Engineer",
    company: "Microsoft",
    logo: "Ms",
    locationZh: "华盛顿 · 雷德蒙德",
    workModeZh: "混合办公",
    category: "software",
    categoryZh: "软件工程",
    visa: ["H-1B", "STEM OPT"],
    salaryMin: 130000,
    salaryMax: 185000,
    currency: "USD",
    level: "L61 / L62",
    headline: "Azure 企业支持扩编，STEM OPT 路径成熟。",
    description: "处理企业计算与网络升级事件，并把重复问题沉淀成自动化。",
    requirements: ["Linux 与网络排障扎实", "能写清楚事故时间线", "英语通话清晰"],
    applyUrl: "https://careers.microsoft.com/",
    source: "Microsoft Careers",
    digestDate: "2026-09-11",
  },
  {
    id: "j-20260911-02",
    title: "Data Engineer, Marketplace",
    company: "Airbnb",
    logo: "Ab",
    locationZh: "加州 · 旧金山",
    workModeZh: "混合办公",
    category: "software",
    categoryZh: "软件工程",
    visa: ["H-1B"],
    salaryMin: 160000,
    salaryMax: 220000,
    currency: "USD",
    level: "L4",
    headline: "市场数据仓库重构，招能扛回填的数据工程师。",
    description: "重建房源与预订主题数仓分层，服务定价与反欺诈。",
    requirements: ["Spark / SQL 熟练", "有过主题域建模"],
    applyUrl: "https://careers.airbnb.com/",
    source: "Airbnb Careers",
    digestDate: "2026-09-11",
  },
];

const digests = [
  {
    date: "2026-09-14",
    title: "秋招加速周：三家样例公司",
    weekdayZh: "星期一",
    summary:
      "今日演示稿收录 Google、OpenAI、Jane Street 三家。小程序无网时也会读这份本地种子，方便在微信开发者工具里直接点开。",
    highlights: [
      "三家均写明签证路径，便于演示筛选与详情页。",
      "薪酬跨度从 18 万到 40 万美元年薪，方便对照列表展示。",
      "往期 9 月 11 日还有微软与 Airbnb，用于历史页。",
    ],
    marketNote:
      "这是给小程序联调准备的种子日报。正式环境请用发布机器人 POST /api/digests 覆盖当天内容。",
    coverLabel: "09 / 14",
    jobCount: 3,
    highlightCount: 3,
    jobs: jobs0914,
    publishedAt: "2026-09-14T07:00:00+08:00",
  },
  {
    date: "2026-09-11",
    title: "周五收官：云支持与数仓",
    weekdayZh: "星期五",
    summary: "往期演示：微软云支持、Airbnb 数仓两条线。",
    highlights: ["往期页应能点进这一天。"],
    marketNote: "用于「往期」列表，不是今日主稿。",
    coverLabel: "09 / 11",
    jobCount: 2,
    highlightCount: 1,
    jobs: jobs0911,
    publishedAt: "2026-09-11T07:00:00+08:00",
  },
];

function getDigest(date) {
  return digests.find((d) => d.date === date) || null;
}

function getJob(id) {
  for (const digest of digests) {
    const job = digest.jobs.find((j) => j.id === id);
    if (job) return { ...job, digestTitle: digest.title };
  }
  return null;
}

function listDigests() {
  return digests.map(({ jobs, ...rest }) => rest);
}

module.exports = {
  todayDate: "2026-09-14",
  getDigest,
  getJob,
  listDigests,
  getToday: () => getDigest("2026-09-14"),
};
