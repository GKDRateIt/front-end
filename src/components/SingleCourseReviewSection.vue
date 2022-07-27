<script setup lang="ts">
import { NButton } from "naive-ui";
import { useRoute } from "vue-router";
import { ReviewApi, UserApi, UserModel } from "../common";

const route = useRoute();

const courseId = Number(route.params.courseId);

const reviews = await ReviewApi.getReviewsByCourseId(courseId);
const postUsers: Array<UserModel> = [];

await (async () => {
  for (const review of reviews) {
    const user = await UserApi.getUserById(review.userId);
    if (!user) {
      postUsers.push({
        userId: 0,
        email: "",
        nickname: "???",
        startYear: "2014",
        group: "0",
      });
    } else {
      postUsers.push(user);
    }
  }
})();
</script>

<template>
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
    <span class="ml-2">
      <n-button> 新增点评 </n-button>
    </span>
  </div>
</template>
