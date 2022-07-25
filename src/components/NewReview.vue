<script setup lang="ts">
import { computed, ref } from "vue";
import { NButton, NSelect, NInput } from "naive-ui";
import { CourseAttribute } from "../common";

const courseAttribute = computed((): CourseAttribute => {
  return {
    id: "???",
    name: "某课程",
    teacher: "X",
    credit: 2.0,
    semester: "春季学期",
    category: "专业必修课",
  };
});

const selectedSemester = ref("XXX学期");
const reviewContent = ref("");

const semesterSelectOptions = [
  {
    label: "某学期 1",
    value: "某学期 1",
  },
  {
    label: "某学期 2",
    value: "某学期 2",
  },
  {
    label: "某学期 3",
    value: "某学期 3",
  },
];
</script>

<template>
  <div
    v-if="$route.query.courseId"
    class="flex-col max-w-[900px] mt-[8vh] mx-auto space-y-8"
  >
    <div class="text-4xl">
      {{ courseAttribute.name }} ({{ $route.query.courseId }})
    </div>
    <div class="flex space-x-5">
      <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
        <div class="flex space-x-2">
          <div>主讲老师</div>
          <div>{{ courseAttribute.teacher }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>学分</div>
          <div>{{ courseAttribute.credit }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>开课学期</div>
          <div>{{ courseAttribute.semester }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>{{ courseAttribute.category }}</div>
        </div>
      </div>
    </div>
    <div class="flex-col space-y-10 text-lg">
      <div class="flex space-x-10">
        <div class="min-w-[8%]">选课时间</div>
        <n-select
          v-model:value="selectedSemester"
          class="max-w-[30%]"
          :options="semesterSelectOptions"
        />
        <div class="min-w-[8%]">评分</div>
        <n-input />
      </div>
      <div class="flex space-x-10">
        <div class="min-w-[8%]">点评内容</div>
        <n-input v-model:value="reviewContent" class="h-64" />
      </div>
      <div>
        <div class="w-fit ml-auto mr-24">
          <n-button>提交点评</n-button>
        </div>
      </div>
    </div>
  </div>
  <div v-else></div>
</template>
