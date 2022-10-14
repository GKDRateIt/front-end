<script setup lang="ts">
import { UserApi } from "../../api/user";

const jwt = localStorage.getItem("jwt")
  ? UserApi.decodeJwt(localStorage.getItem("jwt") as string)
  : null;
const email = jwt ? jwt.email : null;
</script>

<template>
  <div>Hello! {{ email }}</div>
</template>
