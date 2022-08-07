<script setup lang="ts">
import LogInSection from "./LogInSection.vue";
import RegisterSection from "./RegisterSection.vue";
</script>

<template>
  <div class="w-full h-fit flex justify-center mt-[13vh] space-x-14">
    <log-in-section />
    <div class="w-[3px] h-[500px] bg-gray-300"></div>
    <register-section />
  </div>
</template>
