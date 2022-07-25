<script setup lang="ts">
import { useRoute } from "vue-router";
import { CourseApi, CourseModel, TeacherApi } from "../common";

const route = useRoute();

const courseId = Number(route.params.courseId);

const course = await CourseApi.getCourses(courseId);
console.log(course);

const courseFullCode = ((course: CourseModel): string => {
  var ans = course.code;
  if (course.codeSeq) {
    ans += "-";
    ans += course.codeSeq;
  }
  return ans;
})(course);

const teacher = await TeacherApi.getTeacher(course.teacherId);
</script>

<template>
  <div class="text-4xl">{{ course.name }} ({{ courseFullCode }})</div>
  <div class="flex space-x-5">
    <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
      <div class="flex space-x-2">
        <div>主讲老师</div>
        <div>{{ teacher.name }}</div>
      </div>
      <div>|</div>
      <div class="flex space-x-2">
        <div>学分</div>
        <div>{{ course.credit }}</div>
      </div>
      <div>|</div>
      <div class="flex space-x-2">
        <div>开课学期</div>
        <div>{{ course.semester }}</div>
      </div>
      <!-- <div>|</div>
        <div class="flex space-x-2">
          <div>{{ course.category }}</div>
        </div> -->
    </div>
    <!-- <div class="text-lg leading-10">
        <span class="mx-2">目前评分: {{ courseRating }}</span>
        <span class="mx-2">评分次数: {{ courseRatingCount }}</span>
      </div> -->
  </div>
</template>
