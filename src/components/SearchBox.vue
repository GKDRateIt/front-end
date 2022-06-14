<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { NAutoComplete } from "naive-ui";

const inputData: Ref<string> = ref("");

const submitSearch = computed(() => {
  console.log("Searching " + inputData.value);
  return [
    {
      type: "group",
      label: "教师",
      key: 1,
      children: ["123", "456"],
    },
    {
      type: "group",
      label: "课程",
      key: 2,
      children: ["abc", "def"],
    },
  ];
});
</script>

<template>
  <div class="w-[45vw]">
    <n-auto-complete
      v-model:value="inputData"
      size="large"
      placeholder="输入你想查询的课程名称或主讲教师"
      :options="submitSearch"
    />
  </div>
</template>
