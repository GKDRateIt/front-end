<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="mt-20 ml-20 text-lg max-w-2xl">
    <p>
      <span>
        这是一个为国科大学生设计的课程评价页面，用于汇总民间的各种课程评价，帮助校内学生更好地选择课程。
      </span>
      <span>
        本网站是民间自发建立的，与国科大校方没有任何形式的关联（<del>欸，不是说没有校方吗？</del>）。
      </span>
      <!-- 我们需要赞助吗？ -->
    </p>
    <p>
      <span>
        如果在使用本网站的过程中，发现任何问题，或者对网站有任何建议，请到我们的
        <a href="https://github.com/GKDRateIt/RateIt" class="text-blue-600">
          官方仓库<Icon icon="akar-icons:link-out" class="inline-block" />
        </a>
        反馈(反馈时请尽量使用清晰准确地描述你的问题或需求，避免模糊化的用语)。
      </span>
      <span>
        我们也欢迎有任何人的技术贡献，不论你技术高低，都可以为本网站的发展出一份力。
      </span>
    </p>
  </div>
</template>
