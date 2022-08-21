<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute } from "vue-router";
import { CourseApi, CourseModel } from "../api/course";
import { SearchApi } from "../api/search";
import { TeacherApi, TeacherModel } from "../api/teacher";

const route = useRoute();

const keyword = route.query.keyword ? atob(String(route.query.keyword)) : null;

const courseList: Ref<Array<CourseModel>> = ref([]);
const courseTeacherMap: Ref<Map<Number, TeacherModel>> = ref(new Map());
const teacherList: Ref<Array<TeacherModel>> = ref([]);

if (keyword) {
  SearchApi.search(keyword).then((result) => {
    result[0].forEach((course, index) => {
      courseList.value.push(course);
      TeacherApi.getTeacher(course.teacherId).then((teacher) => {
        if (teacher) {
          courseTeacherMap.value.set(index, teacher);
        }
      });
    });
    result[1].forEach((teacher) => {
      teacherList.value.push(teacher);
    });
  });
}
</script>

<template>
  <div class="text-lg w-1/2 m-auto mt-20">
    <div v-for="(item, index) in teacherList" :key="index">
      {{ item.name }}
    </div>
    <div v-for="(item, index) in courseList" :key="index">
      <div class="space-y-5">
        <div class="text-4xl">
          {{ item.name }} ({{ CourseApi.getFullCourseCode(item) }})
        </div>
        <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
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
</template>
