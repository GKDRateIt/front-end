<script setup lang="ts">
import { computed, onMounted, PropType, ref } from "vue";
import { useRoute } from "vue-router";
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

const isNarrowWindow = () => {
  return window.innerWidth < 1000;
};

const collapsed = ref(isNarrowWindow());

onMounted(() => {
  window.onresize = () => {
    if (isNarrowWindow() && !collapsed.value) {
      collapsed.value = true;
    }
  };
});

const direction = computed(() => {
  if (collapsed.value) return "right";
  else return "left";
});
const toggleShow = () => {
  collapsed.value = !collapsed.value;
};
</script>

<template>
  <div
    v-if="registry"
    class="bg-green-200 min-w-[300px] w-96 h-screen flex justify-between"
    :class="{
      'ml-[-26.5em]': collapsed,
    }"
    style="transition: all 0.5s ease-in-out"
  >
    <div>
      <div class="h-20" />
      <div class="ml-8">
        <nested-list :items="registry.content" />
      </div>
    </div>
    <div class="w-0 cursor-pointer">
      <dynamic-angle
        class="text-4xl m-auto mt-52"
        :class="{
          'ml-[-0.5em]': !collapsed,
          'ml-[-0.3em]': collapsed,
        }"
        :direction="direction"
        @click="toggleShow"
      />
    </div>
  </div>
  <div v-else></div>
</template>
