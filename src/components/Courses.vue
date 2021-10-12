<script>
import {defineComponent} from "vue";
import {NCard} from "naive-ui";

import LongPlaceHolder from "./LongPlaceHolder.vue";

export default defineComponent({
  components: {
    LongPlaceHolder,
    NCard
  },
});
</script>

<template>

  <h2>
    课程页面
  </h2>

  <n-card title="课程卡片" size="medium" hoverable>
    课名：计算机科学导论 &nbsp; &nbsp;
    开课学期：春
    <br>
    开课学院：计算机科学与技术学院 &nbsp; &nbsp;
    主讲教师：xzw，z+0 &nbsp; &nbsp;
    <br>
    课程综合评分：5.0/5.0
    <br>
    课程最新评论：阿巴阿巴……
    <br>
    课程最热评论：阿巴阿巴巴巴……
  </n-card>
</template>

<style scoped>
.n-card {
  max-width: 500px;
}

h2 {
  text-align: center;
  margin: 10%;
}
</style>