<script>
import { NIcon } from "naive-ui";
import { Course } from "@vicons/carbon";
import { HatGraduation24Filled } from "@vicons/fluent";
import { UserGraduate } from "@vicons/fa";
import { defineComponent } from "vue";
import SearchBox from "./SearchBox.vue";

export default defineComponent({
  components: {
    NIcon,
    Course,
    HatGraduation24Filled,
    UserGraduate,
    SearchBox,
  },
  data() {
    return {
      headerOpacity: 1.0,
      headerBottomOpacity: 0.5,
      alternatePos: 0.0,
    };
  },
  methods: {
    handleScroll(event) {
      console.log("Scrolled down");
      var gap = Math.floor((100 * window.scrollY) / window.innerHeight);
      this.headerBottomOpacity = 0.5 + Math.min(gap, 25) * 0.02;
      if (this.$route.fullPath == "/") {
        this.headerOpacity = Math.min(gap, 25) * 0.04;
      }
    },
  },

  mounted() {
    document.addEventListener("scroll", this.handleScroll);
    this.$router.beforeEach((to, from) => {
      console.log(from);
      console.log(to);
      if (to.fullPath == "/") {
        this.headerOpacity = 0.0;
      } else {
        this.headerOpacity = 1.0;
      }
    });
  },

  beforeDestroy() {
    document.removeEventListener("scroll", this.handleScroll);
  },
});
</script>

<template>
  <div id="header-container" :style="{ opacity: headerOpacity }">
    <div id="raw-header">
      <!-- left side -->
      <div id="left-side">
        <div id="header-icon" class="header-item-vertical">
          <router-link to="/">
            <div>[标志图](主页)</div>
          </router-link>
        </div>
      </div>

      <!-- right side -->
      <div id="right-side">
        <div id="search-box" class="header-item-vertical">
          <search-box :flexible="true" />
        </div>

        <nav id="navs">
          <!-- Teachers -->
          <div class="right-block header-item-vertical">
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
          <div class="right-block header-item-vertical">
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
          <div class="right-block header-item-vertical">
            <div>
              <n-icon size="30">
                <user-graduate />
              </n-icon>
              个人主页
            </div>
          </div>
        </nav>
      </div>
    </div>
    <div
      id="header-grad-bottom"
      :style="{ opacity: headerBottomOpacity }"
    ></div>
  </div>
</template>

<style>
.header-item-vertical {
  top: 25%;
  position: relative;
}

#header-container {
  position: sticky;
  top: 0;
  height: 10vh;
  z-index: 10;
}

#raw-header {
  width: 100%;
  margin-top: 0;
  top: 0px;
  background-color: white;
  display: flex;
  height: 90%;
}

#header-grad-bottom {
  height: 10%;
  background-image: linear-gradient(180deg, rgb(212, 212, 212), white);
}

#left-side {
  width: 15%;
}

#header-icon {
  margin-left: 0;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  padding-left: 10%;
}

#right-side {
  display: flex;
  margin-right: 0;
  margin-left: auto;
  width: 70%;
  justify-content: flex-end;
}

#search-box {
  padding-right: 5%;
  width: 40%;
}

#navs {
  display: flex;
  width: 30%;
  justify-content: flex-end;
}

.right-block {
  padding-right: 5%;
}
</style>