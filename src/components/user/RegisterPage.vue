<script setup lang="ts">
import { useMessage } from "naive-ui";
import { ref, watch } from "vue";
import { strHash } from "../../util";
import { ApiResponse, emailSuffix, addEmailSuffix } from "../../api/common";
import { UserApi, UserRegisterQuery } from "../../api/user";
import { useRouter } from "vue-router";

const router = useRouter();

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
  const emailAddress = addEmailSuffix(email.value);
  console.log(emailAddress);
  UserApi.createVerification(emailAddress)
    .then((res: ApiResponse<String>) => {
      if (res.status != "SUCCESS") {
        console.log(res.detail);
        if (res.detail == "User registered") {
          message.error("该邮箱已注册");
        } else {
          message.error("发送验证码失败");
        }
      } else {
        verificationCodeStatus.value = VerificationCodeStatus.JustSent;
      }
    })
    .catch((err: any) => {
      console.log(err);
      message.error("发送验证码失败");
    });
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
  if (import.meta.env.DEV) {
    console.log(`nickname: ${nickname.value}`);
    console.log(`email: ${addEmailSuffix(email.value)}`);
    console.log(`hashed password1: ${strHash(password1.value)}`);
    console.log(`password2: ${strHash(password1.value)}`);
  }

  // Check password match
  if (password1.value !== password2.value) {
    console.log("Passwords do not match");
    message.error("密码不一致");
    return;
  }

  const userQuery: UserRegisterQuery = {
    nickname: nickname.value,
    verificationCode: emailVerificationCode.value,
    email: addEmailSuffix(email.value),
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
        router.push("/login");
      } else {
        console.log(res.detail);
        message.error(`注册失败: ${res.detail}`);
      }
    })
    .catch((err: any) => {
      console.log(err);
      message.error("注册失败");
    });
};
</script>

<template>
  <div class="max-w-md flex-col space-y-5 mt-20 center m-auto">
    <n-card hoverable size="medium" title="请确保你是国科大学生">
      <div class="w-full flex-col space-y-5">
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">邮箱</div>
          <div class="w-4/5">
            <n-input v-model:value="email">
              <template #suffix> {{ emailSuffix }} </template>
            </n-input>
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">验证码</div>
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
                <n-button>发送到邮箱</n-button>
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
          <div class="w-1/5 text-left text-base">昵称</div>
          <div class="w-4/5">
            <n-input v-model:value="nickname" />
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">密码</div>
          <div class="w-4/5">
            <n-input
              v-model:value="password1"
              type="password"
              show-password-on="mousedown"
            />
          </div>
        </div>
        <div class="flex w-full">
          <div class="w-1/5 text-left text-base">确认密码</div>
          <div class="w-4/5">
            <n-input
              v-model:value="password2"
              type="password"
              show-password-on="mousedown"
            />
          </div>
        </div>
        <div class="w-fit mx-auto">
          <n-button class="text-kg" @click="register"> 注册 </n-button>
        </div>
      </div>
      <n-divider />
      <div class="w-fit mx-auto">
        <router-link to="/login"> 已有账号？现在登陆 </router-link>
      </div>
    </n-card>
  </div>
</template>
