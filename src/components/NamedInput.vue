<script setup lang="ts">
import { ref, defineEmits } from "vue";
import { NInput } from "naive-ui";

const value = ref("");

const props = defineProps({
  name: {
    type: String,
    default: "???",
  },
  type: {
    type: String,
    default: "text",
  },
});

const ensureType = (type: string): "text" | "password" => {
  if (type == "text" || type == "password") return type;
  else return "text";
};

const emit = defineEmits(["update:value"]);
</script>

<template>
  <div class="flex space-x-2">
    <div class="w-32 text-left text-xl">{{ props.name }}</div>
    <n-input
      v-model:value="value"
      :type="ensureType(props.type)"
      show-password-on="click"
      @update:value="emit('update:value', value)"
    />
  </div>
</template>
