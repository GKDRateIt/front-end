<script setup lang="ts">
import { ref, inject } from "vue";
import { NButton, NInput, useMessage } from "naive-ui";
import { useRouter } from "vue-router";
import { ApiResponse } from "../api/common";
import { UserLoginQuery, UserApi } from "../api/user";
import { strHash } from "../util";

const { updateIsLoggedIn } = inject("isLoggedIn") as { updateIsLoggedIn: any };

const router = useRouter();

const email = ref("");
const password = ref("");

const message = useMessage();

const logIn = () => {
  console.log("login");
  const userLoginQuery: UserLoginQuery = {
    email: email.value,
    hashedPassword: strHash(password.value),
  };

  // // Check email postfix is `@mails.ucas.ac.cn`
  // if (!email.value.endsWith("@mails.ucas.ac.cn")) {
  //   message.error("邮箱格式错误");
  //   return;
  // }

  UserApi.login(userLoginQuery)
    .then((res: ApiResponse<String>) => {
      if (res.status === "SUCCESS" && res.data) {
        console.log("登录成功");
        console.log(res.data);
        const jwt = res.data as string;
        localStorage.setItem("jwt", jwt);
        message.success("登录成功");
        updateIsLoggedIn(true);
        router.push("/");
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
  <div class="flex-col max-w-md mt-8 m-auto">
    <n-card hoverable size="medium" title="登录账号来贡献新评论">
      <div class="w-full flex-col space-y-5">
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">邮箱</div>
          <div class="w-4/5">
            <n-input v-model:value="email" placeholder="请输入邮箱名">
              <template #suffix> @mails.ucas.ac.cn </template>
            </n-input>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">密码</div>
          <div class="w-4/5">
            <n-input
              v-model:value="password"
              type="password"
              placeholder="请输入密码"
              show-password-on="mousedown"
            />
          </div>
        </div>
        <div class="w-fit mx-auto">
          <n-button @click="logIn"> 登录 </n-button>
        </div>
      </div>
      <n-divider />
      <div class="w-fit mx-auto">
        <router-link to="/register"> 没有账号？注册一个 </router-link>
      </div>
    </n-card>
  </div>
</template>
