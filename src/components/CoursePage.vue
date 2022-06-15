<script setup lang="ts">
import { computed } from "vue";
import { NButton } from "naive-ui";

const courseName = computed(() => {
  return "[课程名称占位符]";
});

const courseAttribute = computed(() => {
  return ["主讲教师：XXX", "学分 2.0", "开课学期 春季", "专业必修课"];
});

const courseRating = computed(() => {
  const rate = 1.0;
  return String((Math.round(rate * 100) / 100).toFixed(2));
});

const courseRatingCount = computed(() => {
  return 6;
});

interface Review {
  id: number;
  courseSelectedAt: string;
  rate: number;
  rateAt: string;
  review: string;
  from: string;
}

const courseReviews = computed(
  (sortMethod: String, start: Number, end: Number): Array<Review> => {
    console.log(`Querying [${start},${end}) reviews by ${sortMethod}...`);
    return [
      {
        id: 0,
        courseSelectedAt: "2017 春季学期",
        rate: 1.7,
        rateAt: "2017-06-06",
        review: "xx 老师的课xxxxxxxxxxxxxxxxxxxxx",
        from: "A",
      },
      {
        id: 1,
        courseSelectedAt: "2022 春季学期",
        rate: 2.8,
        rateAt: "2022-06-06",
        review: "xx 老师的课xxxxxxxxxxxxxxxxxxxxx",
        from: "B",
      },
    ];
  }
);
</script>

<template>
  <div class="flex-col w-[80vw] mt-[8vh] mx-auto space-y-8">
    <div class="text-4xl">{{ courseName }} ({{ $route.params.courseId }})</div>
    <div class="flex space-x-5">
      <div class="text-lg flex space-x-2 leading-10 bg-gray-100 rounded-md">
        <div v-for="(attr, index) in courseAttribute" :key="index">
          <span
            :class="{
              'ml-5': index == 0,
              'mr-5': index == courseAttribute.length - 1,
            }"
            >{{ attr }}</span
          >
          <span v-if="index != courseAttribute.length - 1" class="ml-2">|</span>
        </div>
      </div>
      <div class="text-lg leading-10">
        <span class="mx-2">目前评分: {{ courseRating }}</span>
        <span class="mx-2">评分次数: {{ courseRatingCount }}</span>
      </div>
    </div>
    <div class="flex-col space-y-5">
      <div
        v-for="review in courseReviews"
        :key="review.id"
        class="w-4/5 bg-gray-100 rounded-lg"
      >
        <div class="flex space-x-1">
          <div>点评 #{{ review.id }}</div>
          <div>|</div>
          <div class="flex space-x-2">
            <div>选课学期</div>
            <div>{{ review.courseSelectedAt }}</div>
          </div>
          <div>|</div>
          <div>评分 {{ review.rate }}</div>
          <div>|</div>
          <div>评课时间 {{ review.rateAt }}</div>
        </div>
        <div class="indent-8 text-lg">
          {{ review.review }}
        </div>
        <div>来自用户 @{{ review.from }}</div>
      </div>
    </div>
    <div class="text-lg">
      <span>我也要评价！</span>
      <span>立刻</span>
      <span class="ml-2"><n-button> 新增点评 </n-button></span>
    </div>
  </div>
</template>
