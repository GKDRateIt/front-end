<script setup lang="ts">
import { NButton, useMessage } from "naive-ui";
import NamedInput from "./NamedInput.vue";
import { ref } from "vue";
import { strHash, UserApi, UserRegisterQuery, ApiResponse } from "../common";

const nickname = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const startYear = ref("");

const message = useMessage();

const register = () => {
  console.log(`nickname: ${nickname.value}`);
  console.log(`email: ${email.value}`);
  console.log(`hashed password1: ${strHash(password1.value)}`);
  console.log(`password2: ${strHash(password1.value)}`);

  // Check password match
  if (password1.value !== password2.value) {
    console.log("Passwords do not match");
    message.error("Passwords do not match");
    return;
  }

  // Check email postfix is '@ucas.ac.cn'
  if (!email.value.endsWith("@ucas.ac.cn")) {
    console.log("Email must be @ucas.ac.cn");
    message.error("Email must be @ucas.ac.cn");
    return;
  }

  const userQuery: UserRegisterQuery = {
    _action: "create",
    nickname: nickname.value,
    email: email.value,
    hashedPassword: strHash(password1.value),
    startYear: startYear.value,
    group: "default",
  };
  // create user by UserApi
  UserApi.createUser(userQuery)
    .then((res: ApiResponse<String>) => {
      if (res.status === "SUCCESS") {
        console.log("注册成功");
        message.success("注册成功");
      } else {
        console.log(res.detail);
        message.error("注册失败");
      }
    })
    .catch((err: any) => {
      console.log(err);
      message.error("注册失败");
    });
};
</script>

<template>
  <div class="flex-col space-y-5 mt-8">
    <div class="text-lg">没有账号？注册一个！</div>
    <named-input v-model:value="nickname" name="昵称" />
    <named-input v-model:value="email" name="邮箱" />
    <!-- <named-input name="验证邮箱" /> -->
    <named-input v-model:value="password1" type="password" name="密码" />
    <named-input v-model:value="password2" type="password" name="确认" />
    <div class="w-fit mx-auto">
      <n-button size="large" class="text-xl" @click="register"> 注册 </n-button>
    </div>
  </div>
</template>
