<script setup lang="ts">
import { computed } from "vue";
import { useWindowInfo } from "../../util";
import { useSideBar, sideBarWidthPx } from "./sideBarApi";
import SideBarRaw from "./SideBarRaw.vue";

const registries = [
  {
    path: "/course",
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

const collapseSideBar = () => {
  if (!sideBar.value.collapsed) {
    sideBar.value.collapsed = true;
  }
};

const sideBarStyleClassObj = computed(() => {
  if (!sideBar.value.collapsed) {
    return {};
  } else {
    if (windowInfo.value.isNarrow) {
      return {
        "margin-left": -sideBarWidthPx + "px",
      };
    } else {
      return {
        "margin-left": -(sideBarWidthPx - 50) + "px",
      };
    }
  }
});
</script>

<template>
  <div v-if="!windowInfo.isNarrow">
    <side-bar-raw :registries="registries" :style="sideBarStyleClassObj" />
  </div>
  <div v-else>
    <div class="absolute top-0 flex space-x-0 bg-none z-10 pointer-events-none">
      <side-bar-raw
        :registries="registries"
        class="z-50 pointer-events-auto"
        :style="sideBarStyleClassObj"
      />
      <div
        class="h-screen w-screen bg-red-50 opacity-0"
        :class="{
          'pointer-events-none': sideBar.collapsed,
          'pointer-events-auto': !sideBar.collapsed,
        }"
        @click="collapseSideBar"
      ></div>
    </div>
  </div>
</template>
