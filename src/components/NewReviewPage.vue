<script setup lang="ts">
import DataInput from "./NewReviewDataInput.vue";
</script>

<template>
  <Suspense>
    <data-input />
    <template #fallback> Loading... </template>
  </Suspense>
</template>
