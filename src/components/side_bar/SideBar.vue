<script setup lang="ts">
import SideBarRaw from "./SideBarRaw.vue";

const registries = [
  {
    path: "/",
    content: [
      {
        name: "TEST 1",
        children: [
          { name: "Go To New Course", target: "/new-course" },
          {
            name: "Show Alert",
            target: () => {
              console.log("Child 2 clicked");
              alert("Child 2 clicked");
            },
          },
          { name: "Child 3" },
          { name: "Child 4" },
        ],
      },
      {
        name: "TEST 2",
      },
      {
        name: "TEST 3",
        children: [
          { name: "Child 1" },
          { name: "Child 2" },
          { name: "Child 3" },
          {
            name: "Child 4",
            children: [
              { name: "Nested 1" },
              { name: "Nested 2" },
              { name: "Nested 3" },
            ],
          },
        ],
      },
      { name: "TEST 4" },
    ],
  },
];
</script>

<template>
  <side-bar-raw :registries="registries" />
</template>
