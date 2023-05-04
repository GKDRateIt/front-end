<script setup lang="ts">
import { onMounted } from "vue";
import SideBar from "./components/side_bar/SideBar.vue";
import PageHeader from "./components/PageHeader.vue";
import PageBody from "./components/PageBody.vue";
import PageFooter from "./components/PageFooter.vue";
import { useWindowInfo } from "./util";
import { useSideBarInfo } from "./components/side_bar/sideBarApi";

const windowInfo = useWindowInfo();
const sideBarInfo = useSideBarInfo();

onMounted(() => {
  window.addEventListener("resize", () => {
    const isNarrowBefore = windowInfo.value.checkIsNarrow();
    windowInfo.value.width = window.innerWidth;
    windowInfo.value.height = window.innerHeight;
    const isNarrowAfter = windowInfo.value.checkIsNarrow();
    windowInfo.value.isNarrow = isNarrowAfter;

    if (isNarrowBefore != isNarrowAfter) {
      sideBarInfo.value.collapsed = isNarrowAfter;
    }
  });
});
</script>

<template>
  <n-message-provider>
    <div class="flex">
      <side-bar />
      <div class="flex flex-col w-full justify-between min-h-screen z-0">
        <div class="flex flex-col space-y-0 w-full min-w-screen">
          <page-header />
          <page-body />
        </div>
        <page-footer />
      </div>
    </div>
  </n-message-provider>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
