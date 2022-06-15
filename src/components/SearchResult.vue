<script setup lang="ts">
import SearchBox from "./SearchBox.vue";
import { Semester, CourseCategory } from "../common";

interface ResultEntry {
  name: string;
  id: string;
  teacher: string;
  grade: number;
  semester: Semester;
  category: CourseCategory;
  rate: number;
  lastRated: string;
}

const getResultEntries = (
  start: number,
  end: number
): Array<ResultEntry> | undefined => {
  console.log(`getting [${start}, ${end}) searching results...`);
  return [
    {
      name: "计算机组成原理",
      id: "XXX",
      teacher: "ZK",
      grade: 2.0,
      semester: "春季学期",
      category: "专业必修课",
      rate: 1.8,
      lastRated: "2021-11-05",
    },
    {
      name: "原子物理",
      id: "YYY",
      teacher: "HHB",
      grade: 3.0,
      semester: "春季学期",
      category: "专业必修课",
      rate: 2.7,
      lastRated: "2020-7-05",
    },
  ];
};
</script>

<template>
  <div class="flex-col space-y-5 w-[70vw] mx-auto mt-[6vh]">
    <div>
      <search-box placeholder="继续搜索" />
    </div>
    <div class="text-lg">"{{ $route.query.keywords }}" 的搜索结果：</div>
    <div
      v-for="resultEntry in getResultEntries(0, 10)"
      :key="resultEntry.id"
      class="bg-gray-100 rounded-lg"
    >
      <div class="flex space-x-2 text-lg">
        <div>{{ resultEntry.name }}</div>
        <div>{{ resultEntry.id }}</div>
        <div>|</div>
        <div>主讲教师</div>
        <div>{{ resultEntry.teacher }}</div>
        <div>|</div>
        <div>学分</div>
        <div>{{ resultEntry.grade }}</div>
        <div>|</div>
        <div>开课学期</div>
        <div>{{ resultEntry.semester }}</div>
        <div>|</div>
        <div>{{ resultEntry.category }}</div>
      </div>
      <div class="mt-2 indent-4 text-lg">
        综合评分 {{ resultEntry.rate }}，最近一条点评为
        {{ resultEntry.lastRated }}
      </div>
    </div>
  </div>
</template>
