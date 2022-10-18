<script setup lang="ts">
import { useWindowInfo } from "../../util";
import { useSideBar } from "./sideBarApi";
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

const sideBar = useSideBar();
const windowInfo = useWindowInfo();
</script>

<template>
  <div v-if="!windowInfo.isNarrow">
    <side-bar-raw
      :registries="registries"
      :class="{
        'ml-[-350px]': sideBar.collapsed && !windowInfo.isNarrow,
        'ml-[-400px]': sideBar.collapsed && windowInfo.isNarrow,
      }"
    />
  </div>
  <div v-else>
    <div class="absolute top-0 flex space-x-0 bg-none z-10 pointer-events-none">
      <side-bar-raw
        :registries="registries"
        class="z-50 pointer-events-auto"
        :class="{
          'ml-[-350px]': sideBar.collapsed && !windowInfo.isNarrow,
          'ml-[-400px]': sideBar.collapsed && windowInfo.isNarrow,
        }"
      />
      <div class="h-screen w-screen bg-red-50 opacity-0 pointer-events-none"></div>
    </div>
  </div>
</template>
