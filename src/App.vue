<script>
import { defineComponent } from "vue";
import { NMessageProvider } from "naive-ui";
import Header from "./components/Header.vue";

export default defineComponent({
  components: {
    Header,
    NMessageProvider,
  },
});
</script>

<template>
  <n-message-provider>
    <Header></Header>
    <router-view></router-view>
  </n-message-provider>
</template>

<style>
</style>
