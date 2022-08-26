<script setup lang="ts">
import { defineComponent, h, ref } from "vue";
import { NButton, NInput } from "naive-ui";

const courseName = ref("");
const courseCode = ref("");
const courseTeacher = ref("");
const courseSemester = ref("");
const courseDegree = ref("");
const courseCredit = ref("");

const InfoSlot = defineComponent({
  props: {
    name: {
      type: String,
      default: "???",
    },
    value: {
      type: String,
      default: -1,
    },
  },
  emits: ["update:value"],
  render() {
    return h("div", { class: "flex h-10" }, [
      h("div", { class: "text-xl w-1/6" }, this.name),
      h(NInput, { size: "small" }),
    ]);
  },
});

// TODO: Finish course submit.
</script>

<template>
  <div class="flex-col w-[70vw] mx-auto mt-10 space-y-8">
    <div class="text-4xl">新增课程</div>
    <div class="flex-col space-y-5">
      <info-slot v-model:value="courseName" name="课程名称" />
      <info-slot v-model:value="courseCode" name="课程号" />
      <info-slot v-model:value="courseTeacher" name="主讲教师" />
      <info-slot v-model:value="courseSemester" name="开课学期" />
      <info-slot v-model:value="courseDegree" name="课程类别" />
      <info-slot v-model:value="courseCredit" name="学分" />
      <div class="w-fit ml-auto mr-0">
        <n-button size="large" class="text-lg"> 提交审核 </n-button>
      </div>
    </div>
  </div>
</template>
