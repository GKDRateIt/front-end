<script setup lang="ts">
import { NButton, NInput, useMessage } from "naive-ui";
import { ref, watch } from "vue";
import { strHash, UserApi, UserRegisterQuery, ApiResponse } from "../common";

const nickname = ref("");
const email = ref("");
const password1 = ref("");
const password2 = ref("");
const startYear = ref("");
const emailVerificationCode = ref("");

const message = useMessage();

// eslint-disable-next-line no-unused-vars
enum VerificationCodeStatus {
  // eslint-disable-next-line no-unused-vars
  Unsent,
  // eslint-disable-next-line no-unused-vars
  JustSent,
  // eslint-disable-next-line no-unused-vars
  LongSent,
}

const verificationCodeStatus = ref(VerificationCodeStatus.Unsent);

const sendCode = () => {
  verificationCodeStatus.value = VerificationCodeStatus.JustSent;
};

const resendLimit = 60; // in sec
const sentTime = ref(0);

watch(
  sentTime,
  (time, prevTime) => {
    if (time >= resendLimit) {
      verificationCodeStatus.value = VerificationCodeStatus.LongSent;
      sentTime.value = 0;
    } else if (
      verificationCodeStatus.value == VerificationCodeStatus.JustSent &&
      prevTime
        ? prevTime
        : 0 < resendLimit
    ) {
      setTimeout(() => {
        sentTime.value++;
      }, 1000);
    }
  },
  { immediate: true }
);

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

  // Check email postfix is '@mails.ucas.ac.cn'
  if (!email.value.endsWith("@mails.ucas.ac.cn")) {
    console.log("Email must be @mails.ucas.ac.cn");
    message.error("Email must be @mails.ucas.ac.cn");
    return;
  }

  const userQuery: UserRegisterQuery = {
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
  <div class="w-1/3 max-w-md flex-col space-y-5 mt-8">
    <div class="text-lg">没有账号？注册一个！</div>
    <div class="w-full flex-col space-y-5">
      <div class="flex w-full">
        <div class="w-1/5 text-left text-xl">昵称</div>
        <div class="w-4/5"><n-input v-model:value="nickname" /></div>
      </div>
      <div class="flex w-full">
        <div class="w-1/5 text-left text-xl">邮箱</div>
        <div class="w-4/5"><n-input v-model:value="email" /></div>
      </div>
      <div class="flex w-full">
        <div class="w-1/5 text-left text-xl">验证码</div>
        <div class="flex w-4/5 space-x-4">
          <n-input v-model:value="emailVerificationCode" />
          <div class="w-2/5">
            <div
              v-if="
                verificationCodeStatus == VerificationCodeStatus.Unsent ||
                verificationCodeStatus == VerificationCodeStatus.LongSent
              "
              @click="sendCode"
            >
              <n-button>获取验证码</n-button>
            </div>
            <div
              v-if="verificationCodeStatus == VerificationCodeStatus.JustSent"
              class="text-md text-center"
            >
              {{ resendLimit - sentTime }}s 后重新发送
            </div>
          </div>
        </div>
      </div>
      <div class="flex w-full">
        <div class="w-1/5 text-left text-xl">密码</div>
        <div class="w-4/5">
          <n-input v-model:value="password1" type="password" />
        </div>
      </div>
      <div class="flex w-full">
        <div class="w-1/5 text-left text-xl">确认</div>
        <div class="w-4/5">
          <n-input v-model:value="password2" type="password" />
        </div>
      </div>
    </div>
    <div class="w-fit mx-auto">
      <n-button size="large" class="text-xl" @click="register"> 注册 </n-button>
    </div>
  </div>
</template>
