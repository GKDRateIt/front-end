<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import keyboardArrowUpSharp from "@iconify-icons/material-symbols/keyboard-arrow-up-sharp";

const props = defineProps({
  direction: {
    type: String,
    required: true,
  },
});

const rotate = computed(() => {
  switch (props.direction) {
    case "up":
      return 0;
    case "right":
      return 90;
    case "down":
      return 180;
    case "left":
      return 270;
    default:
      return 0;
  }
});
</script>

<template>
  <Icon
    :icon="keyboardArrowUpSharp"
    class="w-fit h-fit"
    style="transition: rotate 0.3s ease-in-out"
    :style="{
      rotate: rotate + 'deg',
    }"
  />
</template>
