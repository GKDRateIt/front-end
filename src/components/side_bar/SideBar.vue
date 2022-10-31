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
