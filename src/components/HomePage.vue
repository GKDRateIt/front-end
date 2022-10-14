<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import SearchBox from "./search/SearchBox.vue";

const router = useRouter();

const value = ref("");

const submitSearch = () => {
  if (import.meta.env.DEV) {
    console.log(`Searching: ${value.value}`);
  }
  if (value.value.length > 0) {
    router.push(`/search?keyword=${encodeURIComponent(value.value)}`);
  }
};
</script>

<template>
  <div class="flex-col m-auto inset-1/2 mt-[23vh] space-y-6">
    <div class="flex mx-auto w-fit space-x-5">
      <div class="text-7xl h-fit mt-auto mb-0">RateIt</div>
      <div class="text-6xl h-fit mt-auto mb-0">@UCAS</div>
    </div>
    <div class="w-full">
      <div class="w-1/2 max-w-fit min-w-fit flex m-auto space-x-5">
        <search-box
          v-model:value="value"
          class="min-w-[300px] max-w-2xl"
          @keypress.enter="submitSearch"
        />
        <n-button size="large" @click="submitSearch"> 搜索 </n-button>
      </div>
    </div>
  </div>
</template>
