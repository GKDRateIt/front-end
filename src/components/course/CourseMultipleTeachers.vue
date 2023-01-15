<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import { TeacherApi, TeacherModel } from "../../api/teacher";
import { CourseApi, CourseModel } from "../../api/course";
import { ReviewApi, ReviewModel } from "../../api/review";
import { UserModel } from "../../api/user";

// const router = useRouter();
const route = useRoute();

let courseCode = String(route.query.code);
let courseCodeSeq = route.query.seq?.toString();

const selectedTeacherId: Ref<number | null> = ref(null);
const courses: Ref<CourseModel[]> = ref([]);

// courseId to teacher map
const courseTeacherMap: Ref<Map<number, TeacherModel>> = ref(new Map());

const reviews: Ref<ReviewModel[]> = ref([]);

// reviewId to user map
const reviewUserMap: Ref<Map<number, UserModel>> = ref(new Map());

// reviewId to course map
const reviewCourseMap: Ref<Map<number, CourseModel>> = ref(new Map());

// TODO: Join query instead of stupid manual query.

const refreshData = () => {
  courseCode = String(route.query.code);
  courseCodeSeq = route.query.seq?.toString();

  selectedTeacherId.value = null;
  courses.value = [];
  courseTeacherMap.value = new Map();
  reviews.value = [];
  reviewUserMap.value = new Map();
  reviewCourseMap.value = new Map();

  CourseApi.getCourses({
    code: courseCode,
    codeSeq: courseCodeSeq,
  }).then((rCourses) => {
    if (!rCourses) {
      return;
    }
    // console.log(rCourses);
    courses.value = rCourses;
    rCourses.forEach((rCourse) => {
      TeacherApi.getTeacherById(rCourse.teacherId).then((rTeacher) => {
        if (rTeacher) {
          courseTeacherMap.value.set(rCourse.courseId, rTeacher);
        }
      });
    });
  });

  ReviewApi.getReviews({
    courseCode: courseCode,
    courseCodeSeq: courseCodeSeq,
  }).then((rReviews) => {
    // console.log(rReviews);
    reviews.value = rReviews;
    rReviews.forEach((review) => {
      const mappedCourse = courses.value.find(
        (course) => course.courseId == review.courseId
      );
      if (mappedCourse) {
        reviewCourseMap.value.set(review.reviewId, mappedCourse);
      }
    });
  });
};

refreshData();
onBeforeRouteUpdate(() => {
  refreshData();
});

const getTeacherByReviewId = (reviewId: number): TeacherModel | undefined => {
  let cIdP = reviewCourseMap.value.get(reviewId)?.courseId;
  let cId: number = cIdP ? cIdP : -1;
  return courseTeacherMap.value.get(cId);
};

const filteredReviews = computed(() => {
  return reviews.value.filter((review) => {
    return (
      courseTeacherMap.value.get(review.courseId)?.teacherId ==
        selectedTeacherId.value || !selectedTeacherId.value
    );
  });
});

// const newReview = (courseId: number) => {
//   router.push(`/new-review?courseId=${courseId}`);
// };
</script>

<template>
  <div
    v-if="courses.length > 0"
    class="flex-col space-y-5 m-10 my-20 mx-auto w-2/3"
  >
    <div>
      <div class="text-sm text-neutral-500">
        {{ courses[0].semester === "autumn" ? "秋季学期" : "春季学期" }}
        {{ courses[0].credit }}学分
      </div>
      <div class="inline-flex space-x-3">
        <div class="bg-white space-x-6 text-3xl text-left font-bold">
          {{ courses[0].name }}
          <div class="text-2xl text-neutral-700 font-normal pt-1">
            {{ courseCode }}
          </div>
        </div>
        <div class="text-[24px] leading-9">⭐⭐⭐⭐⭐</div>
      </div>
    </div>
    <div class="flex-col flex-nowrap space-x-3 space-y-1">
      <div class="btn-group space-x-2">
        <div
          class="btn teacher-btn-select text-white rounded-full px-3 py-1"
          @click="() => (selectedTeacherId = null)"
        >
          <button>全部教师</button>
        </div>
        <div
          v-for="[courseId, teacher] in courseTeacherMap"
          :key="courseId"
          class="btn teacher-btn-select text-white rounded-full px-3 py-1"
          @click="
            () => {
              selectedTeacherId = teacher.teacherId;
            }
          "
        >
          <button>{{ teacher.name }}</button>
        </div>
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
        v-for="(review, index) in filteredReviews"
        :key="index"
        class="w-4/5 bg-blue-50 rounded-lg px-3.5 py-2.5"
      >
        <div class="flex space-x-1">
          <div>点评 #{{ index }}</div>
          <div>|</div>
          <div>主讲 {{ getTeacherByReviewId(review.reviewId)?.name }}</div>
          <div>|</div>
          <div>评分 {{ review.overallRecommendation }}</div>
          <div>|</div>
          <div>评课时间 {{ ReviewApi.getFormattedTime(review) }}</div>
        </div>
        <div class="indent-8 text-lg">
          {{ review.commentText }}
        </div>
        <div>来自用户 @{{ reviewUserMap.get(review.userId)?.nickname }}</div>
      </div>
    </div>
    <div class="text-lg">
      <span>我也要评价！</span>
      <span>立刻</span>
      <span class="ml-2">
        <n-button> 新增点评 </n-button>
      </span>
    </div>
  </div>
  <div v-else>找不到课程</div>
</template>

<style scoped>
.teacher-btn-select:active {
  background-color: #134dba;
}

.teacher-btn-select {
  background-color: #3b74dc;
}
</style>
