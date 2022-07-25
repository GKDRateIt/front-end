<script setup lang="ts">
import { Suspense } from "vue";
import SingleCourseSection from "./SingleCourseSection.vue";
import SingleCourseReviewSection from "./SingleCourseReviewSection.vue";
</script>

<template>
  <suspense>
    <div class="flex-col w-[70vw] mt-[8vh] mx-auto space-y-8">
      <SingleCourseSection />
      <SingleCourseReviewSection />
    </div>
    <template #fallback> Loading... </template>
  </suspense>
</template>
