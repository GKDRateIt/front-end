<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";
import angleUp from "@iconify-icons/fa/angle-up";

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
  <div
    style="transition: rotate 0.3s ease-in-out; width: fit-content"
    :style="{
      rotate: rotate + 'deg',
    }"
  >
    <Icon :icon="angleUp" />
  </div>
</template>
