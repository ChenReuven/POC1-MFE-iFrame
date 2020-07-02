<template>
  <div>
    <h1>Second Page</h1>
    <router-link class="nav-link" to="/first-page"
      >Go To First Page</router-link
    >
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
