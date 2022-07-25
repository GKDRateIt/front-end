<script setup lang="ts">
import { decodeJwt } from "../common";

const jwt = decodeJwt(localStorage.getItem("jwt"));
const email = jwt.email;
</script>

<template>
  <div>Hello! {{ email }}</div>
</template>
