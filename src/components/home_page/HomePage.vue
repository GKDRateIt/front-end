<script setup lang="ts">
import { computed } from "vue";
import { useWindowInfo, wrapStyle } from "../../util";
import CategoryBox from "./CategoryBox.vue";

const windowInfo = useWindowInfo();

const categoryBoxStyle = wrapStyle({
  "font-weight": { wide: "15px", narrow: "10px" },
  gap: { wide: "3em", narrow: "2em" },
});

const bannerTextStyle = wrapStyle({
  "font-size": { wide: "3em", narrow: "2.3em" },
});

const domainTextStyle = wrapStyle({
  "font-size": { wide: "2.5em", narrow: "1.5em" },
});

const hotCourseStyle = wrapStyle({
  "font-size": { wide: "3em", narrow: "2em" },
  "padding-left": { wide: "30px", narrow: "15px" },
  "padding-top": { wide: "20px", narrow: "5px" },
});

const singleItemRowStyleClass = computed(() => {
  if (windowInfo.value.isNarrow) {
    return "grow";
  } else {
    return "";
  }
});
</script>

<template>
  <!--  -->
  <!-- Section 1  -->
  <!--  -->

  <!-- Flexible empty space -->
  <div class="w-full h-[8vh] bg-[#2755a5]"></div>
  <!-- Welcom text -->
  <div class="flex-col bg-[#2755a5] inset-1/2 space-y-0.5">
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
  <div class="w-full h-6 bg-[#2755a5]"></div>
  <div class="flex space-x-0 bg-[#2755a5]">
    <div class="m-auto">
      <div class="bg-[#2755a5] grid content-center" :style="categoryBoxStyle">
        <category-box
          category="数理基础"
          subtitle="按课程检索"
          :description="['微积分I', '微积分II', '线性代数I', '线性代数II']"
        />
        <category-box
          category="公共课"
          subtitle="按开课单位检索"
          :description="[
            '外语系',
            '创新创业学院',
            '马克思主义学院',
            '心理学系',
            '艺术中心',
            '体育教研室',
          ]"
        />
        <category-box
          category="专业课"
          subtitle="按开课单位检索"
          :description="[
            '数学学院',
            '物理学院',
            '天文学院',
            '化学学院',
            '生命学院',
            '资环学院',
            '计算机学院',
            '电子学院',
            '工程学院',
            '经管学院',
            '公管学院',
            '外语系',
            '网安学院',
            '创新创业学院',
            '马克思主义学院',
            '心理学系',
            '人工智能学院',
            '艺术中心',
            '体育教研室',
            '本科部',
          ]"
          :class="singleItemRowStyleClass"
        />
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
