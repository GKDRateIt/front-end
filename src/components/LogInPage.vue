<script setup lang="ts">
import LogInSection from "./LogInSection.vue";
import RegisterSection from "./RegisterSection.vue";
</script>

<template>
  <div class="w-full h-fit flex justify-center mt-[13vh] space-x-10">
    <div class="flex-col space-y-10 mt-12">
      <log-in-section />
    </div>
    <div class="w-[2px] h-[400px] bg-gray-300"></div>
    <register-section />
  </div>
</template>
