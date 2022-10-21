<script setup lang="ts">
import { PropType } from "vue";
import { wrapStyle } from "../../util";

const boxStyle = wrapStyle({
  width: { wide: "200px", narrow: "120px" },
  height: { wide: "200px", narrow: "120px" },
});

defineProps({
  category: {
    type: String,
    default: "???",
  },
  // eslint-disable-next-line vue/require-default-prop
  description: {
    type: Object as PropType<String | String[]>,
    required: false,
  },
});

const sectionHeaderStyle = wrapStyle({
  "font-size": { wide: "2em", narrow: "1.3em" },
  "padding-top": { wide: "20px", narrow: "10px" },
  "padding-left": { wide: "15px", narrow: "5px" },
});

const descriptionStyle = wrapStyle({
  "font-size": { wide: "1.6em", narrow: "1em" },
  "padding-left": { wide: "15px", narrow: "5px" },
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="rounded-lg bg-white" :style="boxStyle">
      <div class="h-2/5">
        <div :style="sectionHeaderStyle">
          {{ category }}
        </div>
      </div>
      <div v-if="description">
        <div v-if="Array.isArray(description)">
          <div
            v-for="(item, index) in description"
            :key="index"
            :style="descriptionStyle"
          >
            {{ item }}
          </div>
        </div>
        <div v-else :style="descriptionStyle">{{ description }}</div>
      </div>
    </div>
  </div>
</template>
