<script>
import { NIcon } from "naive-ui";
import { Course } from "@vicons/carbon";
import { HatGraduation24Filled } from "@vicons/fluent";
import { UserGraduate } from "@vicons/fa";
import { defineComponent } from "vue";

export default defineComponent({
  components: {
    NIcon,
    Course,
    HatGraduation24Filled,
    UserGraduate,
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
      <nav>
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
    <hr />
  </div>
</template>

<style>
hr {
  color: gainsboro;
}

.header {
  width: 100%;
  margin-top: 0;
  position: sticky;
  top: 0px;
  background-color: rgb(245, 245, 245);
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
</style>