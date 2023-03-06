<script setup lang="ts">
import { inject, computed, ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { Icon } from "@iconify/vue";
import uiUserProfile from "@iconify-icons/healthicons/ui-user-profile-negative";
import { useWindowInfo } from "../util";
import { NAutoComplete } from "naive-ui";

const { isLoggedIn } = inject("isLoggedIn") as { isLoggedIn: any };

const router = useRouter();

const windowInfo = useWindowInfo();

const headerBorderStyle = computed(() => {
  const style: any = {};
  return style;
});

const searchBarStatus: Ref<"focus" | "blur"> = ref("blur");
const searchBarText = ref("");

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

const submitSearch = () => {
  router.push({
    path: "/search",
    query: {
      keyword: searchBarText.value,
    },
  });
};
</script>

<template>
  <div id="header" class="top-0 w-full" :style="headerBorderStyle">
    <div class="bg-[#2755a5] w-full h-14 flex justify-between">
      <!-- Left part -->
      <div class="min-w-[350px] w-1/2 flex justify-start space-x-6 pl-5">
        <router-link to="/">
          <div class="flex w-fit h-full items-center cursor-pointer">
            <div class="text-4xl text-white">RateIt</div>
          </div>
        </router-link>
        <div class="flex h-full items-center w-2/3">
          <n-auto-complete
            v-model:value="searchBarText"
            placeholder="检索课程或老师"
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
            @keyup.enter="submitSearch"
          />
        </div>
      </div>
      <!-- Right part -->
      <div class="w-fit flex justify-end space-x-6 pr-6 my-3">
        <router-link v-if="isLoggedIn" to="/profile">
          <div class="bg-white h-fit w-fit text-center">
            <Icon :icon="uiUserProfile" width="40" style="color: #2755a5" />
          </div>
        </router-link>
        <router-link v-else to="/login">
          <div class="bg-white h-fit w-fit text-center">
            <Icon :icon="uiUserProfile" width="40" style="color: #2755a5" />
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
