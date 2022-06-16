<script setup lang="ts">
import { NButton } from "naive-ui";
import NamedInput from "./NamedInput.vue";
</script>

<template>
  <div class="w-full h-fit flex justify-center mt-[13vh] space-x-10">
    <div class="flex-col space-y-10 mt-12">
      <named-input name="邮箱" />
      <named-input name="密码" />
      <div class="w-fit mx-auto">
        <n-button size="large" class="text-xl"> 登录 </n-button>
      </div>
    </div>
    <div class="w-[2px] h-[400px] bg-gray-300"></div>
    <div class="flex-col space-y-5 mt-8">
      <div class="text-lg">没有账号？注册一个！</div>
      <named-input name="昵称" />
      <named-input name="邮箱" />
      <named-input name="验证邮箱" />
      <named-input name="密码" />
      <named-input name="确认" />
    </div>
  </div>
</template>
