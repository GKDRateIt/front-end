<script setup lang="ts">
import { computed } from "vue";
import { useWindowInfo } from "../../util";
import { useSideBarInfo, sideBarWidthPx } from "./sideBarApi";
import SideBarRaw from "./SideBarRaw.vue";
import * as sideBarContents from "./SideBarContents";

const registries = [
  {
    path: "/profile",
    content: sideBarContents.userProfile,
  },
  {
    path: "/profile/my-reviews",
    content: sideBarContents.userProfile,
  },
  {
    path: "/profile/my-submissions",
    content: sideBarContents.userProfile,
  },
  { path: "/course", content: sideBarContents.courseCategory },
  { path: "/courseAll", content: sideBarContents.courseCategory },
  { path: "/courses/1", content: sideBarContents.mathPhysicBasics },
  { path: "/courses/2", content: sideBarContents.publicCourses },
  { path: "/courses/3", content: sideBarContents.majors },
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
        "margin-left": -(sideBarWidthPx - 30) + "px",
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
