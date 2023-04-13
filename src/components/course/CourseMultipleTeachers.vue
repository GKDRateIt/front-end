<script setup lang="ts">
import { ref, Ref, computed } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { TeacherApi, TeacherModel } from "../../api/teacher";
import { CourseApi, CourseModel } from "../../api/course";
import { ReviewApi, ReviewModel } from "../../api/review";
import { UserApi, UserModel } from "../../api/user";
import { formatSemester } from "../../util";
import { NRate } from "naive-ui";

const router = useRouter();
const route = useRoute();

let courseCode = String(route.query.code);
let courseCodeSeq = route.query.seq as string | undefined;

const courses: Ref<CourseModel[]> = ref([]);

// courseId to teacher map
const courseTeacherMap: Ref<Map<number, TeacherModel>> = ref(new Map());

// Selected teacher & course
const selectedTeacherId: Ref<number | null> = ref(null);
const selectedCourseId: Ref<number | null> = ref(null);
const selectedTeacher = computed(() => {
  if (selectedCourseId.value == null) return undefined;
  return courseTeacherMap.value.get(selectedCourseId.value);
});
const selectedCourse = computed(() => {
  return courses.value.find((elem) => elem.courseId == selectedCourseId.value);
});

const avgOverallRecommendation = computed(() => {
  if (selectedCourse.value) {
    return selectedCourse.value.overallRecommendation;
  }
  let avg = 0;
  courses.value.forEach((c) => {
    avg += c.overallRecommendation;
  });
  if (courses.value.length > 0) {
    avg /= courses.value.length;
  }
  return avg;
});

const avgWorkload = computed(() => {
  if (selectedCourse.value) {
    return selectedCourse.value.workload;
  }
  let avg = 0;
  courses.value.forEach((c) => {
    avg += c.workload;
  });
  if (courses.value.length > 0) {
    avg /= courses.value.length;
  }
  return avg;
});

const avgDifficulty = computed(() => {
  if (selectedCourse.value) {
    return selectedCourse.value.difficulty;
  }
  let avg = 0;
  courses.value.forEach((c) => {
    avg += c.difficulty;
  });
  if (courses.value.length > 0) {
    avg /= courses.value.length;
  }
  return avg;
});

const avgQuality = computed(() => {
  if (selectedCourse.value) {
    return selectedCourse.value.quality;
  }
  let avg = 0;
  courses.value.forEach((c) => {
    avg += c.quality;
  });
  if (courses.value.length > 0) {
    avg /= courses.value.length;
  }
  return avg;
});

const courseLoaded = ref(false);
const reviewLoaded = ref(false);
const allLoaded = computed(() => {
  return courseLoaded.value && reviewLoaded.value;
});

const reviews: Ref<ReviewModel[]> = ref([]);

// reviewId to user map
const reviewUserMap: Ref<Map<number, UserModel>> = ref(new Map());

// reviewId to course map
const reviewCourseMap: Ref<Map<number, CourseModel>> = ref(new Map());

// TODO: Join query instead of stupid manual query.

const refreshData = () => {
  courseCode = String(route.query.code);
  courseCodeSeq = route.query.seq as string | undefined;

  selectedTeacherId.value = null;
  courses.value = [];
  courseTeacherMap.value = new Map();
  reviews.value = [];
  reviewUserMap.value = new Map();
  reviewCourseMap.value = new Map();

  CourseApi.getCourses({
    code: courseCode,
    ...(courseCodeSeq && { codeSeq: courseCodeSeq }),
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
    courseLoaded.value = true;
  });

  ReviewApi.getReviews({
    courseCode: courseCode,
    ...(courseCodeSeq && { codeSeq: courseCodeSeq }),
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
      UserApi.getUserById(review.reviewId).then((user) => {
        if (user) {
          reviewUserMap.value.set(review.reviewId, user);
        }
      });
    });
    reviewLoaded.value = true;
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

const newReview = () => {
  let code = courseCode;
  let codeSeq = courseCodeSeq;
  if (selectedTeacherId.value) {
    const targetCourse = courses.value.find((course) => {
      return course.teacherId == selectedTeacherId.value;
    });
    if (targetCourse) {
      code = targetCourse.code;
      codeSeq = targetCourse.codeSeq;
    }
  }
  router.push(
    `/new-review?courseCode=${code}&courseCodeSeq=${codeSeq ? codeSeq : ""}`
  );
};
</script>

<template>
  <div v-if="!allLoaded">加载中</div>
  <div
    v-else-if="courses.length > 0"
    class="flex-col space-y-5 m-10 my-20 mx-auto w-2/3"
  >
    <div>
      <div class="text-sm text-neutral-500">
        {{ formatSemester(courses[0].semester) }}
        {{ courses[0].credit }}学分
      </div>
      <div class="inline-flex space-x-3">
        <div class="bg-white space-x-6 text-3xl text-left font-bold">
          {{ courses[0].name }}
          <div class="text-2xl text-neutral-700 font-normal pt-1">
            {{ courseCode }}
          </div>
        </div>
        <div class="text-[24px] leading-9 text-xl font-semibold">
          <n-rate
            allow-half
            readonly
            :default-value="avgOverallRecommendation"
          />
        </div>
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
              selectedCourseId = courseId;
            }
          "
        >
          <button>{{ teacher.name }}</button>
        </div>
      </div>
    </div>

    <div class="flex-col space-y-5">
      <div class="w-3/5 rounded-lg px-3 py-2">
        <div class="flex flex-row space-x-3">
          <div>👾课程难度：</div>
          <n-rate allow-half readonly :default-value="avgDifficulty" />
        </div>
        <div class="flex flex-row space-x-3">
          <div>📚作业多少：</div>
          <n-rate allow-half readonly :default-value="avgWorkload" />
        </div>
        <div class="flex flex-row space-x-3">
          <div>😋收获大小：</div>
          <n-rate allow-half readonly :default-value="avgQuality" />
        </div>
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
        <div
          class="h-auto grid gap-1"
          style="grid-template-columns: repeat(auto-fill, minmax(150px, 1fr))"
        >
          <div class="flex flex-row space-x-1">
            <div>难度：</div>
            <div>
              <n-rate
                readonly
                allow-half
                :default-value="review.difficulty"
                size="small"
              />
            </div>
          </div>
          <div class="flex flex-row space-x-1">
            <div>作业：</div>
            <div>
              <n-rate
                allow-half
                readonly
                :default-value="review.workload"
                size="small"
              />
            </div>
          </div>
          <div class="flex flex-row space-x-1">
            <div>收获：</div>
            <div>
              <n-rate
                allow-half
                readonly
                :default-value="review.quality"
                size="small"
              />
            </div>
          </div>
        </div>
        <div>来自用户 @{{ reviewUserMap.get(review.userId)?.nickname }}</div>
      </div>
    </div>
    <div class="text-lg">
      <span>我也要评价！</span>
      <span>立刻</span>
      <span class="ml-2">
        <n-button @click="newReview"> 新增点评 </n-button>
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
