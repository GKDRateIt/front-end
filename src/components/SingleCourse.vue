<script>
export default {
  data() {
    return {
      courseId: this.$route.params.courseId,
    };
  },
  methods: {
    getCourseName(id) {
      return "XXX";
    },
  },
};
</script>

<template>
  <h2>{{ getCourseName(courseId) }} 的课程评价</h2>
  <h3>{{ courseId }}</h3>
</template>