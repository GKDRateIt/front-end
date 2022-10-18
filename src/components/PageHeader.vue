<script setup lang="ts">
import { ref, inject, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import stackIcon from "@iconify-icons/charm/stack";
import { checkIsNarrowWindow } from "../util";
import { useSideBar } from "./side_bar/sideBarApi";
import UserProfile from "./user/UserProfile.vue";

const { isLoggedIn } = inject("isLoggedIn") as { isLoggedIn: any };

const isNarrowWindow = ref(checkIsNarrowWindow());

const sideBar = useSideBar();

onMounted(() => {
  window.onresize = () => {
    isNarrowWindow.value = checkIsNarrowWindow();
    if (isNarrowWindow.value && !sideBar.value.collapsed) {
      sideBar.value.collapsed = true;
    }
  };
});

const mainIconClick = () => {
  sideBar.value.collapsed = !sideBar.value.collapsed;
};
</script>

<template>
  <div id="header" class="bg-neutral-200 w-full h-14 flex justify-between">
    <!-- Left part -->
    <div class="w-fit flex justify-start space-x-6 ml-5 my-3">
      <div class="flex h-full items-center cursor-pointer" @click="mainIconClick">
          <Icon :icon="stackIcon" width="30" />
      </div>
      <router-link to="/new-course">
        <div class="bg-white h-fit w-fit text-center">
          <n-button>新增课程</n-button>
        </div>
      </router-link>
    </div>
    <!-- Right part -->
    <div class="w-fit flex justify-end space-x-6 mr-10 my-3">
      <div v-if="isLoggedIn">
        <user-profile />
      </div>
      <router-link v-else to="/login">
        <div class="bg-white h-fit w-fit text-center">
          <n-button>登录/注册</n-button>
        </div>
      </router-link>
    </div>
  </div>
</template>
