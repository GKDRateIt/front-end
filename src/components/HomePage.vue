<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { NButton } from "naive-ui";
import SearchBox from "./SearchBox.vue";

const router = useRouter();

const value = ref("");

const submitSearch = () => {
  console.log(`Searching: ${value.value}`);
  router.push("/search");
};
</script>

<template>
  <div class="flex-col m-auto inset-1/2 mt-[23vh] space-y-6">
    <div class="flex mx-auto w-fit space-x-5">
      <div class="text-7xl h-fit mt-auto mb-0">RateIt</div>
      <div class="text-6xl h-fit mt-auto mb-0">@UCAS</div>
    </div>
    <div class="w-fit m-auto">
      <search-box v-model:value="value" />
    </div>
    <div class="flex m-auto w-fit space-x-5">
      <n-button @click="submitSearch"> 开始检索 </n-button>
      <n-button> 试试手气 </n-button>
    </div>
  </div>
</template>
