<script>
export default {
  data() {
    return {
      teacherId: this.$route.params.teacherId,
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
  <h2>{{ getCourseName(teacherId) }} 的课程评价</h2>
  <h3>{{ teacherId }}</h3>
</template>