import { useRouter } from "vue-router";

const router = useRouter();

export const userProfile = [
  {
    name: "我的评价",
    target: () => {
      router.push("/profile/my-reviews");
    },
  },
  {
    name: "我的提交",
    target: () => {
      router.push("/profile/my-submissions");
    },
  },
];

export const courseCategory = [
  {
    name: "数理基础",
    children: [{ name: "线性代数" }, { name: "微积分" }],
  },
  {
    name: "公共通识",
  },
  {
    name: "专业",
    children: [
      {
        name: "计算机科学与技术",
        children: [
          { name: "操作系统", target: "/course" },
          { name: "计算机体系结构" },
        ],
      },
    ],
  },
];

export const mathPhysicBasics = [
  {
    name: "回到首页",
    target: () => {
      router.push("/");
    },
  },
  {
    name: "微积分",
    children: [
      { name: "微积分I-A" },
      { name: "微积分II-A" },
      { name: "微积分I-B" },
      { name: "微积分II-B" },
    ],
  },
  {
    name: "线性代数",
    children: [
      { name: "线性代数I-A" },
      { name: "线性代数II-A" },
      { name: "线性代数I-B" },
      { name: "线性代数II-B" },
    ],
  },
  {
    name: "力学",
    children: [{ name: "力学-A" }, { name: "力学-B" }],
  },
  {
    name: "热学",
    children: [{ name: "热学-A" }, { name: "热学-B" }],
  },
];

export const publicCourses = [
  {
    name: "回到首页",
    target: () => {
      router.push("/");
    },
  },
  {
    name: "外语系",
    children: [
      { name: "大学英语I" },
      { name: "大学英语II" },
      { name: "大学英语III" },
      { name: "大学英语IV" },
    ],
  },
  { name: "创新创业学院" },
  { name: "马克思主义学院" },
  { name: "心理学系" },
  { name: "艺术中心" },
  {
    name: "体育教研室",
    children: [{ name: "排球" }, { name: "羽毛球" }, { name: "足球" }],
  },
];

export const majors = [
  {
    name: "回到首页",
    target: () => {
      router.push("/");
    },
  },
  {
    name: "数学学院",
  },
  {
    name: "物理学院",
  },
  {
    name: "天文学院",
  },
  {
    name: "化学学院",
  },
  {
    name: "生命学院",
  },
  {
    name: "资环学院",
  },
  {
    name: "计算机学院",
    children: [
      { name: "操作系统" },
      { name: "操作系统（研讨课）" },
      { name: "软件工程" },
      { name: "人工智能基础" },
    ],
  },
  {
    name: "电子学院",
  },
  {
    name: "工程学院",
  },
  {
    name: "经管学院",
  },
  {
    name: "公管学院",
  },
  {
    name: "外语系",
  },
  {
    name: "网安学院",
  },
  {
    name: "创新创业学院",
  },
  {
    name: "马克思主义学院",
  },
  {
    name: "心理学系",
  },
  {
    name: "人工智能学院",
  },
  {
    name: "艺术中心",
  },
  {
    name: "体育教研室",
  },
  {
    name: "本科部",
  },
];
