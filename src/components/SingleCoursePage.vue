<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NButton } from "naive-ui";
import {
  CourseApi,
  CourseModel,
  ReviewModel,
  TeacherApi,
  TeacherModel,
  UserModel,
  UserApi,
  ReviewApi,
} from "../common";

const router = useRouter();
const route = useRoute();

const courseCode = String(route.query.code);
const courseSeq: string | null = route.query.seq
  ? route.query.seq.toString()
  : null;

if (import.meta.env.DEV) {
  console.log(`courseCode: ${courseCode}, courseSeq: ${courseSeq}`);
}

const teacher: Ref<TeacherModel | null> = ref(null);
const course: Ref<CourseModel | null> = ref(null);

const reviews: Ref<Array<ReviewModel>> = ref([]);
const postUsers: Ref<Array<UserModel>> = ref([]);

CourseApi.getCourse({
  courseId: null,
  code: courseCode,
  seq: courseSeq,
  name: null,
}).then((courseRes) => {
  course.value = courseRes;
  if (courseRes) {
    TeacherApi.getTeacher(courseRes.teacherId).then((teacherRes) => {
      teacher.value = teacherRes;
    });

    ReviewApi.getReviewsByCourseId(courseRes.courseId).then((reviewRes) => {
      reviews.value = reviewRes;
      for (const review of reviewRes) {
        UserApi.getUserById(review.userId).then((user) => {
          if (user) {
            postUsers.value.push(user);
          } else {
            postUsers.value.push({
              userId: 0,
              email: "???",
              nickname: "???",
              startYear: "???",
              group: "???",
            });
          }
        });
      }
    });
  }
});

if (import.meta.env.DEV) {
  console.log(course);
}

const newReview = () => {
  router.push(`/new-review?courseId=${course.value?.courseId}`);
};
</script>

<template>
  <div v-if="course" class="flex-col space-y-5 m-10 mx-auto w-2/3">
    <div class="text-4xl">
      {{ course ? course.name : "" }} ({{
        CourseApi.getFullCourseCode(course)
      }})
    </div>
    <div class="flex space-x-5">
      <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
        <div class="flex space-x-2">
          <div>主讲老师</div>
          <div>{{ teacher ? teacher.name : "" }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>学分</div>
          <div>{{ course ? course.credit : "" }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>开课学期</div>
          <div>{{ course ? course.semester : "" }}</div>
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
    <div class="flex-col space-y-5">
      <div
        v-for="(review, index) in reviews"
        :key="review.reviewId"
        class="w-4/5 bg-gray-100 rounded-lg"
      >
        <div class="flex space-x-1">
          <div>点评 #{{ index }}</div>
          <div>|</div>
          <!-- <div class="flex space-x-2">
            <div>选课学期</div>
            <div>{{ review.courseSelectedAt }}</div>
          </div>
          <div>|</div> -->
          <div>评分 {{ review.overallRecommendation }}</div>
          <div>|</div>
          <div>评课时间 {{ review.createTime }}</div>
        </div>
        <div class="indent-8 text-lg">
          {{ review.commentText }}
        </div>
        <div>来自用户 @{{ postUsers[index].nickname }}</div>
      </div>
    </div>
    <div class="text-lg">
      <span>我也要评价！</span>
      <span>立刻</span>
      <span class="ml-2" @click="newReview">
        <n-button> 新增点评 </n-button>
      </span>
    </div>
  </div>
  <div v-else>找不到课程</div>
</template>
