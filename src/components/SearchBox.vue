<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { NAutoComplete } from "naive-ui";

const placeholder = "输入你想查询的课程名称或主讲教师";

const value = ref("");

const router = useRouter();

const options = computed(() => {
  return ["aaa", "bbb", "ccc"].map((elem) => {
    return {
      label: value.value + `-${elem}`,
      value: value.value + `-${elem}`,
    };
  });
});

const submitSearch = (data: string | number) => {
  console.log(`Searching: ${data}`);
  router.push("/search");
};

const emit = defineEmits(["update:value"]);

const updateValue = (str: string) => {
  emit("update:value", str);
  value.value = str;
};
</script>

<template>
  <div class="w-[45vw]">
    <n-auto-complete
      v-model:value="value"
      size="large"
      :placeholder="placeholder"
      :options="options"
      :on-select="submitSearch"
      :on-update:value="updateValue"
    />
  </div>
</template>
