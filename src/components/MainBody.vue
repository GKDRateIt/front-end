<script>
import { defineComponent } from "vue";
import LongPlaceHolder from "./LongPlaceHolder.vue";
import SearchBox from "./SearchBox.vue";

export default defineComponent({
  components: {
    LongPlaceHolder,
    SearchBox,
  },
});
</script>

<template>
  <div id="main-page-first-page">
    <div id="main-page-search-box-container">
      <div class="main-page-centering-x">
        <search-box />
      </div>
    </div>
    <div class="main-page-centering-x main-page-info">
      <p>反正这有个贼拉酷炫的第一屏</p>
      <p>顶部导航条还隐藏了</p>
      <p>往下滑的时候导航条会出现</p>
      <p>非主页的话导航条不会隐藏的</p>
      <p>导航条里的搜索框还可以自动收起/展开</p>
    </div>
  </div>
  <long-place-holder />
</template>

<style scoped>
#main-page-first-page {
  height: 90vh;
  margin: auto;
}

#main-page-search-box-container {
  top: 30%;
  position: relative;
  margin: auto;
}

.main-page-centering-x {
  width: 50%;
  position: relative;
  margin: auto;
}

.main-page-info {
  top: 40%;
  text-align: center;
}
</style>