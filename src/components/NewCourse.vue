<script setup lang="ts">
import NamedInput from "./NamedInput.vue";
import { NButton } from "naive-ui";
</script>

<template>
  <div class="flex-col w-[60vw] mx-auto mt-10 space-y-10">
    <div class="text-4xl">新增课程</div>
    <div class="flex-col space-y-3">
      <named-input name="课程名称" />
      <named-input name="课程号" />
      <named-input name="主讲教师" />
      <named-input name="开课学期" />
      <named-input name="课程类别" />
      <named-input name="学分" />
    </div>
    <div class="flex justify-items-end">
      <div class="w-fit ml-auto mr-10">
        <n-button size="large" class="text-lg"> 提交审核 </n-button>
      </div>
    </div>
  </div>
</template>
