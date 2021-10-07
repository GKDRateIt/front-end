<script>
import { NIcon, NAutoComplete } from "naive-ui";
import { Course } from "@vicons/carbon";
import { HatGraduation24Filled, Search48Regular } from "@vicons/fluent";
import { UserGraduate } from "@vicons/fa";
import { defineComponent, ref } from "vue";
import { tHotSearch } from "../tools/hotSearch.js";

export default defineComponent({
  components: {
    NIcon,
    NAutoComplete,
    Course,
    HatGraduation24Filled,
    UserGraduate,
    Search48Regular,
  },
  computed: {
    hotSearch() {
      var res = tHotSearch(this.searchBoxValueRef);
      return res;
    },
  },
  data() {
    return {
      searchBoxValueRef: ref(""),
    };
  },
});
</script>

<template>
  <div class="header">
    <!-- left side -->
    <div class="left-side">
      <router-link to="/">
        <div class="block">[标志图](主页)</div>
      </router-link>
    </div>

    <!-- right side -->
    <div class="right-side">
      <div class="block">
        <div id="header-search-box-container">
          <n-icon size="30" id="header-search-icon">
            <search-48-regular />
          </n-icon>
          <n-auto-complete
            id="header-search-box-input"
            :options="hotSearch"
            v-model:value="searchBoxValueRef"
            placeholder="搜索"
          />
        </div>
      </div>

      <nav class="block">
        <!-- Teachers -->
        <div class="block">
          <router-link to="/teachers">
            <div>
              <n-icon size="30">
                <hat-graduation-24-filled />
              </n-icon>
              教师列表
            </div>
          </router-link>
        </div>
        <!-- Courses -->
        <div class="block">
          <router-link to="/courses">
            <div>
              <n-icon size="30">
                <course />
              </n-icon>
              课程列表
            </div>
          </router-link>
        </div>
        <!-- Porfile -->
        <div class="block">
          <div>
            <n-icon size="30">
              <user-graduate />
            </n-icon>
            个人主页
          </div>
        </div>
      </nav>
    </div>
    <div class="header-grad-bottom"></div>
  </div>
</template>

<style>
.header {
  width: 100%;
  margin-top: 0;
  position: sticky;
  top: 0px;
  background-color: white;
}

.header-grad-bottom {
  height: 10px;
  background-image: linear-gradient(180deg, rgb(212, 212, 212), white);
}

.left-side {
  text-align: left;
  float: left;
  padding-left: 20px;
}

.right-side {
  text-align: right;
  /* float: right; */
  /* I don't know why. But we only need put `float` for left-side. Or error occurs */
  padding-right: 20px;
}

.block {
  display: inline-block;
  padding: 10px;
}

#header-search-box-container {
  display: flex;
  padding-right: 20px;
}
</style>