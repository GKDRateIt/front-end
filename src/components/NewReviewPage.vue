<script setup lang="ts">
import { ref, Ref, defineComponent, h } from "vue";
import { useRoute } from "vue-router";
import { NButton, NSelect, NInput, NRate, useMessage } from "naive-ui";
import {
  CourseApi,
  ReviewApi,
  ReviewCreateQuery,
  getLoggedInUserEmail,
  CourseModel,
} from "../common";

const route = useRoute();
const message = useMessage();

const courseId = String(route.query.courseId);

const course: Ref<null | CourseModel> = ref(null);

CourseApi.getCourse({
  courseId: courseId,
  code: null,
  seq: null,
  name: null,
}).then((courseRes) => {
  course.value = courseRes;
});

const userEmail = getLoggedInUserEmail();

const selectedSemester = ref(Number(new Date().getFullYear()).toString());
const commentText = ref("");
const overallRecommendation = ref(0);
const quality = ref(0);
const difficulty = ref(0);
const workload = ref(0);

const semesterSelectOptions = (() => {
  var years = [];
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

  const query: ReviewCreateQuery = {
    courseId: courseId.toString(),
    email: String(userEmail),
    createTime: new Date().toString(),
    lastUpdateTime: new Date().toString(),
    overallRecommendation: overallRecommendation.value.toString(),
    quality: quality.value.toString(),
    difficulty: difficulty.value.toString(),
    workload: workload.value.toString(),
    commentText: commentText.value,
  };
  ReviewApi.createReview(query)
    .then((result) => {
      if (result.status == "SUCCESS") {
        message.success("评论提交成功");
      } else {
        console.log(result);
        message.error("评论提交失败");
      }
    })
    .catch((err) => {
      console.log("评论提交失败" + err);
      message.error("评论提交失败" + err);
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
    v-if="userEmail && courseId && course"
    class="flex-col max-w-[900px] mt-[8vh] mx-auto space-y-8"
  >
    <div class="text-4xl">{{ course.name }} ({{ courseId }})</div>
    <div class="flex space-x-5">
      <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
        <div class="flex space-x-2">
          <div>主讲老师</div>
          <div>{{ course.teacherId }}</div>
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
