<script setup lang="ts">
import { PropType } from "vue";
import { wrapStyle } from "../../util";

const boxStyle = wrapStyle({
  width: { wide: "530px", narrow: "300px" },
  height: { wide: "270px", narrow: "200px" },
  "padding-left": { wide: "15px", narrow: "11px" },
  "padding-right": { wide: "13px", narrow: "6px" },
  "padding-top": { wide: "5px", narrow: "3px" },
});

defineProps({
  category: {
    type: String,
    default: "???",
  },
  // eslint-disable-next-line vue/prop-name-casing
  cat_path: {
    type: String,
    default: "/courses/",
  },
  subtitle: {
    type: String,
    default: "",
  },
  // eslint-disable-next-line vue/require-default-prop
  description: {
    type: Object as PropType<String | String[]>,
    required: false,
  },
});

const sectionHeaderStyle = wrapStyle({
  "font-size": { wide: "30px", narrow: "20px" },
  "padding-top": { wide: "20px", narrow: "10px" },
  "padding-left": { wide: "15px", narrow: "5px" },
  "padding-bottom": { wide: "4px", narrow: "2px" },
});

const subtitleStyle = wrapStyle({
  "font-size": { wide: "19px", narrow: "13px" },
});

const descriptionStyle = wrapStyle({
  "font-size": { wide: "20px", narrow: "14px" },
  "padding-left": { wide: "17px", narrow: "7px" },
  "padding-right": { wide: "15px", narrow: "5px" },
});
</script>

<template>
  <div class="flex justify-center items-center">
    <div class="rounded-lg bg-white" :style="boxStyle">
      <div>
        <div class="h-2/5 inline-block">
          <router-link :to="cat_path">
            <div :style="sectionHeaderStyle">
              {{ category }}
            </div>
          </router-link>
        </div>
        <div v-if="subtitle" class="inline-block">
          <div :style="subtitleStyle" class="text-neutral-500 inline-block">
            <div class="inline-block pl-2 pr-0.5">|</div>
            {{ subtitle }}
          </div>
        </div>
      </div>
      <div v-if="description">
        <div v-if="Array.isArray(description)">
          <div
            v-for="(item, index) in description"
            :key="index"
            :style="descriptionStyle"
            class="inline-block"
          >
            {{ item }}
          </div>
        </div>
        <div v-else :style="descriptionStyle" class="inline-block">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>
