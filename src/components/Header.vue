<template>
  <header>
    <div>
      <nav>
        <div>
          <router-link to="/courses">搜课程</router-link>
        </div>
        <div>
          <router-link to="/teachers">搜老师</router-link>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header > div > nav {
  margin-right: 1.5rem;
}

header > div > nav > div {
  float: right;
  margin-right: 1rem;
  margin-top: 1rem;
  cursor: "pointer";
}

header > div {
  height: 4rem;
  background-color: #f4f4f4;
}
</style>