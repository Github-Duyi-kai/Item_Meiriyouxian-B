<template>
  <div class="productAdd-container">新增商品
      <h1>{{newRoute}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newRoute: '',
    };
  },
  created() {
    this.newRoute = this.$route.path;
  },
  watch: {
    $route() {
    },
  },
};
</script>

<style>
</style>
