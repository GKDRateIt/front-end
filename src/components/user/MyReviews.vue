<script setup lang="ts">
import { Ref, ref } from "vue";
import { ReviewModel, ReviewApi } from "../../api/review";
import { UserApi } from "../../api/user";

const email = UserApi.getLoggedInUserEmail();

const reviews: Ref<ReviewModel[]> = ref([]);

if (email) {
  ReviewApi.getReviewsByUserEmail(email).then((res: ReviewModel[]) => {
    for (let review of res) {
      reviews.value.push(review);
    }
  });
}
</script>

<template>
  <div>
    <div>(WIP) 我的评价</div>
    <div v-for="(review, idx) in reviews" :key="idx" class="mt-5">
      <div>用户 ID：{{ review.userId }}</div>
      <div>评价：{{ review.commentText }}</div>
    </div>
  </div>
</template>
