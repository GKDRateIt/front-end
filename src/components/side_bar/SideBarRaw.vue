<script setup lang="ts">
import { computed, PropType } from "vue";
import { useRoute } from "vue-router";
import { useSideBar, sideBarWidthPx } from "./sideBarApi";
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
    for (const info of props.registries) {
      if (
        (info.path instanceof String || typeof info.path === "string") &&
        info.path == route.path
      ) {
        return info;
      } else if (info.path instanceof RegExp && route.path.match(info.path)) {
        return info;
      }
    }
  }
  return null;
});

const sideBar = useSideBar();

const direction = computed(() => {
  if (sideBar.value.collapsed) return "right";
  else return "left";
});
const toggleShow = () => {
  sideBar.value.collapsed = !sideBar.value.collapsed;
};

const sideBarStyleObj = {
  width: sideBarWidthPx + "px",
};
</script>

<template>
  <div
    v-if="registry"
    class="bg-green-200 h-screen flex justify-between"
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
          'ml-[-1em]': !sideBar.collapsed,
          'ml-[-0.8em]': sideBar.collapsed,
        }"
        :direction="direction"
        @click="toggleShow"
      />
    </div>
  </div>
</template>
