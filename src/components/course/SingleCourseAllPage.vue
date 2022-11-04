<script setup lang="ts">
import { ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { TeacherApi, TeacherModel } from "../../api/teacher";
import { CourseApi, CourseModel } from "../../api/course";
import { ReviewApi, ReviewModel } from "../../api/review";
import { UserApi, UserModel } from "../../api/user";

const router = useRouter();
const route = useRoute();

const courseCode = String(route.query.code);
const courseSeq: string | null = route.query.seq
  ? route.query.seq.toString()
  : null;

const teacher: Ref<TeacherModel | null> = ref(null);
const course: Ref<CourseModel | null> = ref(null);

const reviews: Ref<Array<ReviewModel>> = ref([]);
const postUsers: Ref<Map<number, UserModel>> = ref(new Map());

CourseApi.getCourse({
  code: courseCode,
  seq: courseSeq,
}).then((courseRes) => {
  course.value = courseRes;
  if (courseRes) {
    TeacherApi.getTeacherById(courseRes.teacherId).then((teacherRes) => {
      teacher.value = teacherRes;
    });

    ReviewApi.getReviewsByCourseId(courseRes.courseId).then((reviewRes) => {
      reviews.value = reviewRes;
      for (const review of reviews.value) {
        if (postUsers.value.get(review.userId) == null) {
          UserApi.getUserById(review.userId).then((user) => {
            if (user) {
              postUsers.value.set(user.userId, user);
            }
          });
        }
      }
    });
  }
});

const newReview = () => {
  router.push(`/new-review?courseId=${course.value?.courseId}`);
};
</script>

<template>
  <div v-if="course" class="flex-col space-y-5 m-10 my-20 mx-auto w-2/3">
    <div>
      <div class="text-sm text-neutral-500">
        {{
          course ? (course.semester === "autumn" ? "秋季学期" : "春季学期") : ""
        }}
        {{ course ? course.credit : "" }}学分
      </div>
      <div class="inline-flex space-x-3">
        <div class="bg-white space-x-6 text-3xl text-left font-bold">
          {{ course ? course.name : "" }}
          <div class="text-2xl text-neutral-700 font-normal pt-1">
            {{ CourseApi.getMainCourseCode(course) }}
          </div>
        </div>
        <div class="text-[24px] leading-9">⭐⭐⭐⭐⭐</div>
      </div>
    </div>
    <div class="flex-col flex-nowrap space-x-3 space-y-1">
      <div class="btn-group space-x-2">
        <button class="btn my-select text-white rounded-full px-3 py-1">
          全部教师
        </button>
        <button class="btn my-select text-white rounded-full px-3 py-1">
          锵锵锵
        </button>
        <button class="btn my-select text-white rounded-full px-3 py-1">
          嘚嘚嘚
        </button>
        <button class="btn my-select text-white rounded-full px-3 py-1">
          菌菌菌
        </button>
      </div>
    </div>

    <div class="flex-col space-y-5">
      <div class="w-3/5 rounded-lg px-3 py-2">
        <div class="text-xl font-semibold">👾课程难度：⭐⭐⭐⭐⭐</div>
        <div class="text-xl font-semibold">📚作业多少：⭐⭐⭐⭐⭐</div>
        <div class="text-xl font-semibold">😋收获大小：⭐⭐⭐⭐⭐</div>
      </div>
    </div>

    <div class="flex-col space-y-5">
      <div
        v-for="(review, index) in reviews"
        :key="review.reviewId"
        class="w-4/5 bg-blue-50 rounded-lg px-3.5 py-2.5"
      >
        <div class="flex space-x-1">
          <div>点评 #{{ index }}</div>
          <div>|</div>
          <div>主讲 占位符</div>
          <div>|</div>
          <div>评分 {{ review.overallRecommendation }}</div>
          <div>|</div>
          <div>评课时间 {{ ReviewApi.getFormattedTime(review) }}</div>
        </div>
        <div class="indent-8 text-lg">
          {{ review.commentText }}
        </div>
        <div>来自用户 @{{ postUsers.get(review.userId)?.nickname }}</div>
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

<style scoped>
.my-select:active {
  background-color: #134dba;
}

.my-select {
  background-color: #3b74dc;
}
</style>
