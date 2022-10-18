<script setup lang="ts">
import { computed, onMounted, PropType, ref } from "vue";
import { useRoute } from "vue-router";
import { useSideBar } from "./sideBarApi";
import { checkIsNarrowWindow } from "../../util";
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

const isNarrowWindow = ref(checkIsNarrowWindow());

const sideBar = useSideBar();

onMounted(() => {
  window.onresize = () => {
    isNarrowWindow.value = checkIsNarrowWindow();
    if (isNarrowWindow.value && !sideBar.value.collapsed) {
      sideBar.value.collapsed = true;
    }
  };
});

const direction = computed(() => {
  if (sideBar.value.collapsed) return "right";
  else return "left";
});
const toggleShow = () => {
  sideBar.value.collapsed = !sideBar.value.collapsed;
};
</script>

<template>
  <div
    v-if="registry"
    class="bg-green-200 w-[400px] h-screen flex justify-between"
    :class="{
      'ml-[-350px]': sideBar.collapsed,
    }"
    style="transition: all 0.5s ease-in-out"
  >
    <div>
      <div class="h-20" />
      <div class="ml-8">
        <nested-list :items="registry.content" />
      </div>
    </div>
    <div class="w-0 cursor-pointer" v-if="!isNarrowWindow">
      <dynamic-angle
        class="text-4xl m-auto mt-52"
        :class="{
          'ml-[-0.5em]': !sideBar.collapsed,
          'ml-[-0.3em]': sideBar.collapsed,
        }"
        :direction="direction"
        @click="toggleShow"
      />
    </div>
  </div>
</template>
