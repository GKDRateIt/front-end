<script setup lang="ts">
import { PropType, ref } from "vue";
import { TreeNode, NonLeafNode, LeafNode } from "./common";
import DynamicAngle from "./DynamicAngle.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps({
  items: {
    type: Object as PropType<Array<TreeNode>>,
    required: true,
  },
});

const isLeafNode = (node: TreeNode) => {
  return !("children" in node);
};

const isChildrenCollapsedRef = ref(props.items.map((_item) => true));
const toggleChildrenCollapse = (index: number) => {
  isChildrenCollapsedRef.value[index] = !isChildrenCollapsedRef.value[index];
};

const wrapClickFn = (item: LeafNode) => {
  if (typeof item.target === "string" || item.target instanceof String) {
    router.push(String(item.target));
  } else if (typeof item.target === "function") {
    item.target();
  }
};
</script>

<template>
  <div class="text-3xl">
    <div v-for="(item, index) of items" :key="index">
      <div
        v-if="isLeafNode(item)"
        class="flex cursor-pointer"
        @click="wrapClickFn(item as LeafNode)"
      >
        <!-- Leaf node rendering -->
        <div class="w-2"></div>
        <div>
          {{ item.name }}
        </div>
      </div>
      <div v-else>
        <!-- Nested list rendering -->
        <div class="flex cursor-pointer" @click="toggleChildrenCollapse(index)">
          <dynamic-angle
            :direction="isChildrenCollapsedRef[index] ? 'right' : 'down'"
          />
          <div class="w-2"></div>
          <div>
            {{ item.name }}
          </div>
        </div>
        <nested-list
          v-if="!isChildrenCollapsedRef[index]"
          :items="(item as NonLeafNode).children"
          class="ml-6 text-[90%]"
        />
        <div v-else></div>
      </div>
      <div class="h-5">
        <!-- Flexible empty space -->
      </div>
    </div>
  </div>
</template>
