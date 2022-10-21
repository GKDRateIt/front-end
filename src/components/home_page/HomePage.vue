<script setup lang="ts">
import { wrapStyle } from "../../util";
import CategoryBox from "./CategoryBox.vue";

const categoryBoxStyle = wrapStyle({
  "grid-template-columns": {
    wide: "repeat(4, minmax(0, 1fr))",
    narrow: "repeat(2, minmax(0, 1fr))",
  },
  "grid-template-rows": {
    wide: "repeat(1, minmax(0, 1fr))",
    narrow: "repeat(2, minmax(0, 1fr))",
  },
  gap: { wide: "10em", narrow: "2em" },
});

const bannerTextStyle = wrapStyle({
  "font-size": { wide: "3em", narrow: "2em" },
});

const domainTextStyle = wrapStyle({
  "font-size": { wide: "2.5em", narrow: "1.5em" },
});

const hotCourseStyle = wrapStyle({
  "font-size": { wide: "3em", narrow: "2em" },
  "padding-left": { wide: "30px", narrow: "15px" },
  "padding-top": { wide: "20px", narrow: "5px" },
});
</script>

<template>
  <!--  -->
  <!-- Section 1  -->
  <!--  -->

  <!-- Flexible empty space -->
  <div class="w-full h-[10vh] bg-[#2755a5]"></div>
  <!-- Welcom text -->
  <div class="flex-col bg-[#2755a5] m-auto inset-1/2 space-y-1">
    <div class="flex mx-auto w-fit text-white" :style="bannerTextStyle">
      欢迎来到国科大评课社区
    </div>
    <div class="flex mx-auto w-fit space-x-5">
      <div class="h-fit mt-auto mb-0 text-white" :style="domainTextStyle">
        RateIt
      </div>
      <div class="h-fit mt-auto mb-0 text-white" :style="domainTextStyle">
        @UCAS
      </div>
    </div>
  </div>
  <!-- Flexible empty space -->
  <div class="w-full h-10 bg-[#2755a5]"></div>
  <div class="flex space-x-0 bg-[#2755a5]">
    <div class="m-auto">
      <div class="bg-[#2755a5] grid content-center" :style="categoryBoxStyle">
        <category-box category="数理基础" :description="['======', '====']" />
        <category-box
          category="通识/英语课"
          :description="['======', '====']"
        />
        <category-box category="体育课" :description="['======', '====']" />
        <category-box category="专业课" :description="['======', '====']" />
      </div>
    </div>
  </div>
  <!-- Flexible empty space -->
  <div class="w-full h-[10vh] bg-[#2755a5]"></div>

  <!--  -->
  <!-- Section 2  -->
  <!--  -->

  <div id="hotCourse" :style="hotCourseStyle">热门课程</div>
  <div class="w-4/5 h-[1000px] m-auto bg-gray-200"></div>
</template>
