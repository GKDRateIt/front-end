<script setup lang="ts">
import SideBar from "./components/side_bar/SideBar.vue";
import PageHeader from "./components/PageHeader.vue";
import PageBody from "./components/PageBody.vue";
import PageFooter from "./components/PageFooter.vue";
</script>

<template>
  <n-message-provider>
    <div class="flex">
      <side-bar />
      <div class="flex flex-col w-full justify-between min-h-screen">
        <div>
          <page-header />
          <page-body />
        </div>
        <page-footer />
      </div>
    </div>
  </n-message-provider>
</template>
