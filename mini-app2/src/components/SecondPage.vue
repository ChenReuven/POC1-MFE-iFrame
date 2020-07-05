<template>
  <div>
    <h3>Second Page</h3>
    <router-link class="nav-link" to="/first-page">Go To First Page</router-link>
    <button v-on:click="raiseAlert">Press here for alert</button>
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
  },
  methods: {
    raiseAlert: () => {
      window.parent.postMessage(
        {
          type: "SHELL_RAISE_ALERT",
          payload: "Vue - Alert From Mini App 2 - Second Component"
        },
        "*"
      );
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
