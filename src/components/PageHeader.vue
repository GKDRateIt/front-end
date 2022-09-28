<script setup lang="ts">
import { inject } from "vue";
import UserProfile from "./UserProfile.vue";

const { isLoggedIn } = inject("isLoggedIn") as { isLoggedIn: any };
</script>

<template>
  <div id="header" class="bg-neutral-200 w-full h-14 flex justify-between">
    <!-- Left part -->
    <div class="w-fit flex justify-start space-x-6 ml-10 my-3">
      <router-link to="/">
        <div class="bg-white h-fit w-fit text-center">
          <n-button>主页</n-button>
        </div>
      </router-link>
      <!-- <router-link to="/recent-review">
        <div class="bg-white h-fit w-fit text-center">
          <n-button>最近点评</n-button>
        </div>
      </router-link> -->
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
