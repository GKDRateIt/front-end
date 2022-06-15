<script setup lang="ts">
import { defineProps } from "vue";
import { NInput } from "naive-ui";

const props = defineProps({
  name: {
    type: String,
    default: "???",
  },
});
</script>

<template>
  <div class="flex space-x-2">
    <div class="w-32 text-left text-xl">{{ props.name }}</div>
    <n-input />
  </div>
</template>
