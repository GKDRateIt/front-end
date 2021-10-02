<script>
import { defineComponent } from "vue";
import LongPlaceHolder from "./LongPlaceHolder.vue";

export default defineComponent({
  components: { LongPlaceHolder },
});
</script>

<template>
  <h2>这是主页面</h2>
  <LongPlaceHolder></LongPlaceHolder>
</template>

<style scoped>
h2 {
  text-align: center;
  margin: 10%;
}
</style>