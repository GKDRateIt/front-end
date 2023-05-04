<script setup lang="ts">
import { ReviewApi, ReviewModel } from "../../api/review";
import { TeacherModel } from "../../api/teacher";
import { UserModel } from "../../api/user";

defineProps<{
  index: number;
  review: ReviewModel;
  teacher?: TeacherModel;
  user?: UserModel;
}>();
</script>

<template>
  <div class="flex space-x-1">
    <div>点评 #{{ index }}</div>
    <div>|</div>
    <div>主讲 {{ teacher?.name }}</div>
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
  <div>来自用户 @{{ user?.nickname }}</div>
</template>
