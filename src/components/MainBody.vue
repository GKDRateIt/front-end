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
  <div id="main-page-search-box-container">
    <div id="main-page-search-box-centering-x">
      <div id="main-page-search-box-centering-y">
        <search-box />
      </div>
    </div>
  </div>
  <long-place-holder />
</template>

<style scoped>
#main-page-search-box-centering-x {
  width: 50%;
  position: relative;
  margin: auto;
  height: 90vh;
}

#main-page-search-box-centering-y {
  top: 40%;
  position: relative;
}
</style>