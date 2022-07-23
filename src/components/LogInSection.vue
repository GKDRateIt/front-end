<script setup lang="ts">
import { ref } from "vue";
import { NButton, useMessage } from "naive-ui";
import NamedInput from "./NamedInput.vue";
import { UserLoginQuery, UserApi, strHash, ApiResponse } from "../common";

const email = ref("");
const password = ref("");

const message = useMessage();

const logIn = () => {
  console.log("login");
  const userLoginQuery: UserLoginQuery = {
    email: email.value,
    hashedPassword: strHash(password.value),
  };

  // Check email postfix is `@ucas.ac.cn`
  if (!email.value.endsWith("@ucas.ac.cn")) {
    message.error("邮箱格式错误");
    return;
  }

  UserApi.login(userLoginQuery)
    .then((res: ApiResponse<String>) => {
      if (res.status === "SUCCESS") {
        console.log("登录成功");
        console.log(res.data);
        message.success("登录成功");
      } else {
        console.log(res.detail);
        message.error("登录失败");
      }
    })
    .catch((err: any) => {
      console.log(err);
      message.error("登录失败");
    });
};
</script>

<template>
  <named-input v-model:value="email" name="邮箱" />
  <named-input v-model:value="password" type="password" name="密码" />
  <div class="w-fit mx-auto">
    <n-button size="large" class="text-xl" @click="logIn"> 登录 </n-button>
  </div>
</template>
