<script setup lang="ts">
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useWindowInfo } from "../../util";
import { useSideBarInfo, sideBarWidthPx } from "./sideBarApi";
import SideBarRaw from "./SideBarRaw.vue";

const router = useRouter();

const profileRelatedContents = [
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
  {
    name: "待审核",
    target: () => {
      router.push("/profile/my-in-censor");
    },
  },
];

const courseRelatedContents = [
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

const SideContentForMPBasics = [
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
const SideContentForPublicCourses = [
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
const SideContentForMajors = [
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

const registries = [
  {
    path: "/profile",
    content: profileRelatedContents,
  },
  {
    path: "/profile/my-reviews",
    content: profileRelatedContents,
  },
  {
    path: "/profile/my-submissions",
    content: profileRelatedContents,
  },
  {
    path: "/profile/my-in-censor",
    content: profileRelatedContents,
  },
  { path: "/course", content: courseRelatedContents },
  { path: "/courseAll", content: courseRelatedContents },
  { path: "/courses/1", content: SideContentForMPBasics },
  { path: "/courses/2", content: SideContentForPublicCourses },
  { path: "/courses/3", content: SideContentForMajors },
];

const sideBarInfo = useSideBarInfo();
const windowInfo = useWindowInfo();

const collapseSideBar = () => {
  if (!sideBarInfo.value.collapsed) {
    sideBarInfo.value.collapsed = true;
  }
};

const sideBarStyleClassObj = computed(() => {
  if (!sideBarInfo.value.collapsed) {
    return {};
  } else {
    if (windowInfo.value.isNarrow) {
      return {
        "margin-left": -sideBarWidthPx + "px",
      };
    } else {
      return {
        "margin-left": -(sideBarWidthPx - 50) + "px",
      };
    }
  }
});
</script>

<template>
  <div v-if="!windowInfo.isNarrow">
    <side-bar-raw :registries="registries" :style="sideBarStyleClassObj" />
  </div>
  <div v-else>
    <div class="absolute top-0 flex space-x-0 bg-none z-10 pointer-events-none">
      <side-bar-raw
        :registries="registries"
        class="z-50 pointer-events-auto"
        :style="sideBarStyleClassObj"
      />
      <div
        class="h-screen w-screen bg-red-50 opacity-0"
        :class="{
          'pointer-events-none': sideBarInfo.collapsed,
          'pointer-events-auto': !sideBarInfo.collapsed,
        }"
        @click="collapseSideBar"
      ></div>
    </div>
  </div>
</template>
