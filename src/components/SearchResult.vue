<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CourseApi, CourseModel } from "../api/course";
import { SearchApi } from "../api/search";
import { TeacherApi, TeacherModel } from "../api/teacher";

const router = useRouter();
const route = useRoute();

const keyword = route.query.keyword
  ? decodeURIComponent(String(route.query.keyword))
  : null;

const courseList: Ref<Array<CourseModel>> = ref([]);
const courseTeacherMap: Ref<Map<Number, TeacherModel>> = ref(new Map());

if (keyword) {
  SearchApi.search(keyword).then((result) => {
    console.log(result);
    result.forEach((course, index) => {
      courseList.value.push(course);
      TeacherApi.getTeacherById(course.teacherId).then((teacher) => {
        if (teacher) {
          courseTeacherMap.value.set(index, teacher);
        }
      });
    });
  });
}

const jumpToCoursePage = (course: CourseModel) => {
  router.push(
    `/course?code=${course.code}&seq=${course.codeSeq ? course.codeSeq : ""}`
  );
};
</script>

<template>
  <div class="text-lg w-1/2 m-auto mt-20">
    <div v-for="(item, index) in courseList" :key="index">
      <div
        class="space-y-5 bg-gray-100 rounded-lg cursor-pointer"
        @click="jumpToCoursePage(item)"
      >
        <div class="pl-10 pr-10 pt-5 pb-5">
          <div class="text-4xl">
            {{ item.name }} ({{ CourseApi.getFullCourseCode(item) }})
          </div>
          <div class="text-lg flex space-x-2 leading-1 rounded-md">
            <div class="flex space-x-2">
              <div>主讲老师</div>
              <div>
                {{ courseTeacherMap.get(index)?.name }}
              </div>
            </div>
            <div>|</div>
            <div class="flex space-x-2">
              <div>学分</div>
              <div>{{ item.credit }}</div>
            </div>
            <div>|</div>
            <div class="flex space-x-2">
              <div>开课学期</div>
              <div>{{ item.semester }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="courseList.length == 0">无搜索结果</div>
  </div>
</template>
