<script setup lang="ts">
import { decodeJwt } from "../common";

const jwt = localStorage.getItem("jwt")
  ? decodeJwt(localStorage.getItem("jwt") as string)
  : null;
const email = jwt ? jwt.email : null;
</script>

<template>
  <div>Hello! {{ email }}</div>
</template>
