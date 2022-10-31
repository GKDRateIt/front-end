<script setup lang="ts">
import { inject, computed, ref, Ref } from "vue";
import { Icon } from "@iconify/vue";
import uiUserProfile from "@iconify-icons/healthicons/ui-user-profile-negative";
import stackIcon from "@iconify-icons/charm/stack";
import { useSideBarInfo } from "./side_bar/sideBarApi";
import { useWindowInfo } from "../util";
import { NAutoComplete } from "naive-ui";

const { isLoggedIn } = inject("isLoggedIn") as { isLoggedIn: any };

const sideBarInfo = useSideBarInfo();
const windowInfo = useWindowInfo();

const mainIconClick = () => {
  sideBarInfo.value.collapsed = !sideBarInfo.value.collapsed;
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

const searchBarStatus: Ref<"focus" | "blur"> = ref("blur");

const searchBarStyleClass = computed(() => {
  if (searchBarStatus.value == "focus") {
    return "w-[100%]";
  } else if (searchBarStatus.value == "blur") {
    if (windowInfo.value.isNarrow) {
      return "w-[100%]";
    } else {
      return "w-[50%]";
    }
  }
  return "";
});
</script>

<template>
  <div id="header" class="top-0 w-full" :style="headerBorderStyle">
    <div class="bg-[#2755a5] w-full h-14 flex justify-between">
      <!-- Left part -->
      <div class="min-w-[350px] w-1/2 flex justify-start space-x-6 pl-5">
        <div
          class="flex w-fit h-full items-center cursor-pointer"
          @click="mainIconClick"
        >
          <Icon :icon="stackIcon" width="30" style="color: white" />
        </div>
        <router-link to="/">
          <div class="flex w-fit h-full items-center cursor-pointer">
            <div class="text-4xl text-white">RateIt</div>
          </div>
        </router-link>
        <div class="flex h-full items-center w-2/3">
          <n-auto-complete
            class="transition-all ease-in-out duration-200"
            :class="searchBarStyleClass"
            @focus="
              () => {
                searchBarStatus = 'focus';
              }
            "
            @blur="
              () => {
                searchBarStatus = 'blur';
              }
            "
          />
        </div>
      </div>
      <!-- Right part -->
      <div class="w-fit flex justify-end space-x-6 pr-6 my-3">
        <div v-if="isLoggedIn">
          <div class="bg-white h-fit w-fit text-center">
            <Icon :icon="uiUserProfile" width="40" style="color: #2755a5" />
          </div>
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
