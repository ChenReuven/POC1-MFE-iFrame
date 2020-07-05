<template>
  <div>
    <h3>First Page</h3>
    <router-link class="nav-link" to="/second-page">Go To Second Page</router-link>
  </div>
</template>

<script>
export default {
  name: "FirstPage",
  props: {},
  created: function() {
    window.parent.postMessage(
      {
        type: "UPDATE_SHELL_URL",
        payload: "mini-app2/first-page"
      },
      "*"
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
