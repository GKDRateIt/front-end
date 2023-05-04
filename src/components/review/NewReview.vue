<script setup lang="ts">
import { ref, Ref, defineComponent, h, computed } from "vue";
import { useRoute } from "vue-router";
import { NRate, useMessage } from "naive-ui";
import { CourseApi, CourseModel } from "../../api/course";
import { ReviewApi, ReviewCreateQuery } from "../../api/review";
import { UserApi } from "../../api/user";
import { formatSemester, useWindowInfo } from "../../util";

const route = useRoute();
const message = useMessage();

const windowInfo = useWindowInfo();

const paramCourseCode = route.query.courseCode?.toString();
const paramCourseCodeSeq = route.query.courseCodeSeq?.toString();

const courses: Ref<CourseModel[]> = ref([]);
const selectedCourse: Ref<null | CourseModel> = ref(null);

CourseApi.getCourses({
  code: paramCourseCode,
  codeSeq: paramCourseCodeSeq,
})
  .then((rCourses) => {
    courses.value = rCourses;
    if (rCourses.length > 0) {
      selectedCourse.value = rCourses[0];
    }
  })
  .catch((e) => {
    message.error("数据加载错误！" + e);
  });

const userEmail = UserApi.getLoggedInUserEmail();

const selectedSemester = ref(Number(new Date().getFullYear()).toString());
const commentText = ref("");
const overallRecommendation = ref(0);
const quality = ref(0);
const difficulty = ref(0);
const workload = ref(0);

const semesterSelectOptions = (() => {
  let years = [];
  for (let y = 2014; y <= Number(new Date().getFullYear()); ++y) {
    years.push(y);
  }
  return years
    .map((year) => {
      return {
        label: year.toString(),
        value: year.toString(),
      };
    })
    .reverse();
})();

const courseSelectOptions = computed(() => {
  return courses.value.map((course) => {
    let fullCode = CourseApi.getFullCourseCode(course);
    return {
      label: fullCode,
      value: fullCode,
    };
  });
});

const handleCourseSelectUpdate = (value: string) => {
  let course = courses.value.find((course) => {
    return CourseApi.getFullCourseCode(course) == value;
  });
  if (course) {
    selectedCourse.value = course;
  }
};

const validRating = (v: Number): boolean => {
  if (!Number.isInteger(v)) {
    return false;
  }
  return v >= 1 && v <= 5;
};

const submitReview = () => {
  console.log(`selectedSemester: ${selectedSemester.value}`);
  console.log(`overallRecommendation: ${overallRecommendation.value}`);
  console.log(`quality: ${quality.value}`);
  console.log(`difficulty: ${difficulty.value}`);
  console.log(`workload: ${workload.value}`);
  console.log(`commentText: ${commentText.value}`);

  const _overallRecommendation = Number(overallRecommendation.value);
  const _quality = Number(quality.value);
  const _difficulty = Number(difficulty.value);
  const _workload = Number(workload.value);

  if (
    !validRating(_overallRecommendation) ||
    !validRating(_quality) ||
    !validRating(_difficulty) ||
    !validRating(_workload)
  ) {
    message.error("评价必须是 0~5 的整数！");
    return;
  }

  let courseId = -1;
  CourseApi.getCourse({
    code: selectedCourse.value?.code,
    codeSeq: selectedCourse.value?.codeSeq,
  })
    .then((course) => {
      if (!course) {
        message.error("找不到指定的课程");
        return;
      }
      courseId = course.courseId;
      const query: ReviewCreateQuery = {
        courseId: courseId,
        email: String(userEmail),
        createTime: new Date().getTime(),
        lastUpdateTime: new Date().getTime(),
        overallRecommendation: overallRecommendation.value,
        quality: quality.value,
        difficulty: difficulty.value,
        workload: workload.value,
        commentText: commentText.value,
      };
      ReviewApi.createReview(query)
        .then(() => {
          message.success("评论提交成功");
        })
        .catch((err) => {
          console.log("评论提交失败" + err);
          message.error("评论提交失败" + err);
        });
    })
    .catch((e) => {
      message.error("数据加载错误！" + e);
    });
};

const RatingBar = defineComponent({
  props: {
    entryName: {
      type: String,
      default: "???",
    },
    value: {
      type: Number,
      default: -1,
    },
  },
  emits: ["update:value"],
  render() {
    return h("div", { class: "flex space-x-5" }, [
      h("div", { class: "w-24" }, this.entryName),
      h(NRate, {
        value: this.value,
        "onUpdate:value": (value) => {
          this.$emit("update:value", value);
        },
      }),
    ]);
  },
});
</script>

<template>
  <div
    v-if="userEmail && courses && selectedCourse"
    class="flex-col mx-auto space-y-8"
    :class="{
      'w-11/12': windowInfo.isNarrow,
      'max-w-[900px]': !windowInfo.isNarrow,
    }"
  >
    <div class="h-3"></div>
    <div class="text-4xl flex space-x-5">
      <div>{{ selectedCourse?.name }}</div>
      <div v-if="courses && courses.length == 1">
        ({{ CourseApi.getFullCourseCode(selectedCourse) }})
      </div>
      <div v-else-if="courses && courses.length > 1" class="min-w-[150px]">
        <n-select
          :default-value="CourseApi.getFullCourseCode(selectedCourse)"
          :options="courseSelectOptions"
          @update:value="handleCourseSelectUpdate"
        />
      </div>
    </div>
    <div class="flex space-x-5">
      <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
        <div class="flex space-x-2">
          <div>主讲老师</div>
          <div>占位符</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>学分</div>
          <div>{{ selectedCourse.credit }}</div>
        </div>
        <div>|</div>
        <div class="flex space-x-2">
          <div>开课学期</div>
          <div>{{ formatSemester(selectedCourse.semester) }}</div>
        </div>
        <!-- <div>|</div>
        <div class="flex space-x-2">
          <div>{{ courseModel.category }}</div>
        </div> -->
      </div>
    </div>
    <div class="flex-col space-y-5 text-lg">
      <div class="flex space-x-10">
        <div class="min-w-[8%]">选课时间</div>
        <n-select
          v-model:value="selectedSemester"
          class="max-w-[30%]"
          :options="semesterSelectOptions"
        />
      </div>
      <div class="w-full">
        <RatingBar
          v-model:value="overallRecommendation"
          entry-name="整体评价"
        />
        <RatingBar v-model:value="quality" entry-name="质量" />
        <RatingBar v-model:value="difficulty" entry-name="难度" />
        <RatingBar v-model:value="workload" entry-name="工作量" />
      </div>
      <div class="flex space-x-10">
        <div class="min-w-[8%]">点评内容</div>
        <n-input v-model:value="commentText" class="h-64" />
      </div>
      <div>
        <div class="w-fit ml-auto mr-24">
          <n-button @click="submitReview">提交点评</n-button>
        </div>
      </div>
    </div>
  </div>
  <div v-else-if="!userEmail">请先登录</div>
  <div v-else>请提供正确的课程号</div>
</template>
