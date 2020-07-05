<template>
  <div>
    <h3>Second Page</h3>
    <router-link class="nav-link" to="/first-page">Go To First Page</router-link>
  </div>
</template>

<script>
export default {
  name: "SecondPage",
  props: {},
  created: function() {
    window.parent.postMessage(
      {
        type: "UPDATE_SHELL_URL",
        payload: "mini-app2/second-page"
      },
      "*"
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
