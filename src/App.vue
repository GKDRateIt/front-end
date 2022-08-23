<script setup lang="ts">
import { NMessageProvider } from "naive-ui";
import PageHeader from "./components/PageHeader.vue";
import PageBody from "./components/PageBody.vue";
import PageFooter from "./components/PageFooter.vue";
</script>

<template>
  <n-message-provider>
    <page-header />
    <page-body />
    <page-footer />
  </n-message-provider>
</template>
