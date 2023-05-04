<script setup lang="ts">
import { ref, Ref, computed, onMounted, onUnmounted } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import { TeacherApi, TeacherModel } from "../../api/teacher";
import { CourseApi, CourseModel } from "../../api/course";
import { ReviewApi, ReviewModel } from "../../api/review";
import { UserApi, UserModel } from "../../api/user";
import { formatSemester } from "../../util";
import { NRate, NButton, NSpin } from "naive-ui";
import CourseReviewStrip from "./CourseReviewStrip.vue";

const router = useRouter();
const route = useRoute();

let reviewPageOffset = 0;
let reviewPageLimit = 5;

let courseCode = String(route.query.code);
let courseCodeSeq = route.query.seq as string | undefined;

const courses: Ref<CourseModel[]> = ref([]);

// courseId to teacher map
const courseTeacherMap: Ref<Map<number, TeacherModel>> = ref(new Map());

// Selected teacher & course
const selectedTeacherId: Ref<number | null> = ref(null);
const selectedCourseId: Ref<number | null> = ref(null);
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

// Indicate if data was loaded at least once.
const courseLoadedOnce = ref(false);
const reviewLoadedOnce = ref(false);
const dataLoadedOnce = computed(() => {
  return courseLoadedOnce.value && reviewLoadedOnce.value;
});

const courseLoading = ref(true);
const reviewLoading = ref(true);
const dataLoading = computed(() => {
  return courseLoading.value && reviewLoading.value;
});

const reviews: Ref<ReviewModel[]> = ref([]);

// reviewId to user map
const reviewUserMap: Ref<Map<number, UserModel>> = ref(new Map());

// reviewId to course map
const reviewCourseMap: Ref<Map<number, CourseModel>> = ref(new Map());

// TODO: Join query instead of stupid manual query.

const appendData = () => {
  reviewLoading.value = true;
  courseLoading.value = true;

  if (!courseLoadedOnce.value) {
    CourseApi.getCourses({
      code: courseCode,
      ...(courseCodeSeq && { codeSeq: courseCodeSeq }),
    }).then((rCourses) => {
      if (!rCourses) {
        return;
      }
      courses.value = courses.value.concat(rCourses);
      rCourses.forEach((rCourse) => {
        TeacherApi.getTeacherById(rCourse.teacherId).then((rTeacher) => {
          if (rTeacher) {
            courseTeacherMap.value.set(rCourse.courseId, rTeacher);
          }
        });
      });
      courseLoadedOnce.value = true;
      setTimeout(() => {
        courseLoading.value = false;
      }, 100);
    });
  }

  ReviewApi.getReviews({
    courseCode: courseCode,
    ...(courseCodeSeq && { codeSeq: courseCodeSeq }),
    pageOffset: reviewPageOffset,
    pageLimit: reviewPageLimit,
  }).then((rReviews) => {
    reviewPageOffset += rReviews.length;
    reviews.value = reviews.value.concat(rReviews);
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
    reviewLoadedOnce.value = true;
    setTimeout(() => {
      reviewLoading.value = false;
    }, 100);
  });
};

const refreshData = () => {
  courseCode = String(route.query.code);
  courseCodeSeq = route.query.seq as string | undefined;

  selectedTeacherId.value = null;
  courses.value = [];
  courseTeacherMap.value = new Map();
  reviews.value = [];
  reviewUserMap.value = new Map();
  reviewCourseMap.value = new Map();

  appendData();
};

const handleScroll = () => {
  if (
    !reviewLoading.value &&
    window.innerHeight + window.scrollY >= document.body.offsetHeight
  ) {
    console.log("Loading more reviews");
    appendData();
  }
};

refreshData();

onBeforeRouteUpdate(() => {
  refreshData();
});

onMounted(() => {
  console.log("Registering wheel event listener");
  window.addEventListener("wheel", handleScroll);
});

onUnmounted(() => {
  console.log("Removing wheel event listener");
  window.removeEventListener("wheel", handleScroll);
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
  <div v-if="!dataLoadedOnce">加载中</div>
  <div
    v-else-if="courses.length > 0"
    class="flex-col space-y-5 m-10 my-20 mx-auto w-4/5 max-w-[900px]"
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
    <div class="flex flex-row space-x-2">
      <button
        class="teacher-btn-outer"
        @click="() => (selectedTeacherId = null)"
      >
        <div class="teacher-btn-inner">全部教师</div>
      </button>
      <button
        v-for="[courseId, teacher] in courseTeacherMap"
        :key="courseId"
        class="teacher-btn-outer"
        @click="
          () => {
            selectedTeacherId = teacher.teacherId;
            selectedCourseId = courseId;
          }
        "
      >
        <div class="teacher-btn-inner">{{ teacher.name }}</div>
      </button>
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

    <div id="course-page-review-list" class="flex-col space-y-5">
      <div
        v-for="(review, index) in filteredReviews"
        :key="index"
        class="bg-blue-50 rounded-lg"
      >
        <CourseReviewStrip
          :index="index"
          :review="review"
          :user="reviewUserMap.get(review.reviewId)"
          :teacher="getTeacherByReviewId(review.reviewId)"
        />
      </div>
    </div>

    <div class="w-fit mx-auto">
      <div v-if="dataLoading">
        <n-spin size="medium" stroke="#2755a5" :stroke-width="20" />
      </div>
      <div v-else class="text-gray-500">下拉查看更多评论</div>
    </div>

    <div class="text-lg">
      <span>我也要评价！</span>
      <span>立刻</span>
      <span class="ml-2">
        <n-button @click="newReview"> 新增点评 </n-button>
      </span>
    </div>
    <div class="h-5"></div>
  </div>
  <div v-else>找不到课程</div>
</template>

<style>
.teacher-btn-outer {
  background-color: #6ea1ff;
  font-size: 17px;
  border-radius: 10px;
}

.teacher-btn-outer:focus {
  background-color: #3b74dc;
}

.teacher-btn-inner {
  padding-left: 12px;
  padding-right: 12px;
  padding-top: 3px;
  padding-bottom: 3px;
  margin: auto;
  color: white;
}
</style>
