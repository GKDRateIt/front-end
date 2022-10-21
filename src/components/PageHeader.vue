<script setup lang="ts">
import { inject } from "vue";
import { Icon } from "@iconify/vue";
import uiUserProfile from "@iconify-icons/healthicons/ui-user-profile-negative";
import stackIcon from "@iconify-icons/charm/stack";
import { useSideBar } from "./side_bar/sideBarApi";
import { useWindowInfo } from "../util";
import UserProfile from "./user/UserProfile.vue";
import { computed } from "vue";

const { isLoggedIn } = inject("isLoggedIn") as { isLoggedIn: any };

const sideBar = useSideBar();
const windowInfo = useWindowInfo();

const mainIconClick = () => {
  sideBar.value.collapsed = !sideBar.value.collapsed;
};

const headerBorderStyle = computed(() => {
  const style: any = {};
  if (windowInfo.value.scrollY < 300) {
    //
  } else {
    // style["border-bottom-width"] = "2px";
    // style["border-bottom-collor"] = "grey";
  }
  return style;
});
</script>

<template>
  <div id="header" class="fixed top-0 w-full" :style="headerBorderStyle">
    <div class="bg-[#2755a5] w-full h-14 flex justify-between">
      <!-- Left part -->
      <div class="w-fit flex justify-start space-x-6 ml-5">
        <div
          class="flex h-full items-center cursor-pointer"
          @click="mainIconClick"
        >
          <Icon :icon="stackIcon" width="30" style="color: white" />
        </div>
        <router-link to="/">
          <div class="flex h-full items-center cursor-pointer">
            <div class="text-4xl text-white">RateIt</div>
          </div>
        </router-link>
      </div>
      <!-- Right part -->
      <div class="w-fit flex justify-end space-x-6 mr-6 my-3">
        <div v-if="isLoggedIn">
          <user-profile />
        </div>
        <router-link v-else to="/login">
          <div class="bg-white h-fit w-fit text-center">
            <Icon :icon="uiUserProfile" width="40" style="color: #2755a5" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
