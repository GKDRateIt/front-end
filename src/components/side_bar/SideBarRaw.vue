<script setup lang="ts">
import { computed, PropType } from "vue";
import { useRoute } from "vue-router";
import { useSideBarInfo, sideBarWidthPx } from "./sideBarApi";
import NestedList from "./NestedList.vue";
import DynamicAngle from "./DynamicAngle.vue";

const route = useRoute();

interface Registry {
  path: string | RegExp;
  content: any;
}

const props = defineProps({
  registries: {
    type: Object as PropType<Registry[]>,
    required: true,
  },
});

const registry = computed(() => {
  if (props.registries) {
    let routePath = route.path;
    if (routePath.endsWith("/")) {
      routePath = routePath.substring(0, routePath.length - 1);
    }
    for (const info of props.registries) {
      // console.log(info.path);
      // console.log(route.path);
      if (info.path instanceof String || typeof info.path === "string") {
        let infoPath = info.path;
        if (infoPath.endsWith("/")) {
          infoPath = infoPath.substring(0, infoPath.length - 1);
        }
        if (infoPath == routePath) {
          return info;
        }
      } else if (info.path instanceof RegExp && info.path.test(route.path)) {
        return info;
      }
    }
  }
  return null;
});

const sideBarInfo = useSideBarInfo();

const direction = computed(() => {
  if (sideBarInfo.value.collapsed) return "right";
  else return "left";
});
const toggleShow = () => {
  console.log("Toggle sidebar: " + sideBarInfo.value.collapsed);
  sideBarInfo.value.collapsed = !sideBarInfo.value.collapsed;
};

const sideBarStyleObj = {
  width: sideBarWidthPx + "px",
};
</script>

<template>
  <div
    v-if="registry"
    class="bg-[#d9d9d9] min-h-screen flex justify-between"
    style="transition: all 0.5s ease-in-out"
    :style="sideBarStyleObj"
  >
    <div>
      <div class="h-20" />
      <div class="ml-8">
        <nested-list :items="registry.content" />
      </div>
    </div>
    <div class="w-0 cursor-pointer">
      <dynamic-angle
        class="text-4xl m-auto mt-5"
        :class="{
          'ml-[-1em]': !sideBarInfo.collapsed,
          'ml-[-0.8em]': sideBarInfo.collapsed,
        }"
        :direction="direction"
        @click="toggleShow"
      />
    </div>
  </div>
</template>
