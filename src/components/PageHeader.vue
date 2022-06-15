<script setup lang="ts">
import { NButton } from "naive-ui";
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
      <div class="bg-white h-fit w-fit text-center">
        <n-button>最近点评</n-button>
      </div>
      <div class="bg-white h-fit w-fit text-center">
        <n-button>新增课程</n-button>
      </div>
    </div>
    <!-- Right part -->
    <div class="w-fit flex justify-end space-x-6 mr-10 my-3">
      <router-link to="/log-in">
        <div class="bg-white h-fit w-fit text-center">
          <n-button>登录/注册</n-button>
        </div>
      </router-link>
    </div>
  </div>
</template>
