<template>
  <div class="productEdit-container">
      <productAdd :editFormData="formData"/>
  </div>
</template>

<script>
import productAdd from './productAdd.vue';
import productApi from '@/api/product';
import categoryApi from '@/api/category';

export default {
  components: {
    productAdd,
  },
  data() {
    return {
      categoryList: [],
      formData: {},
    };
  },
  created() {
    console.log('回填组件拿到信息', this.$route);
    // console.log('这是回填组件拿到的路由信息', this.$route.meta.editFormData);
    // console.log('这是在编辑产品的组件中，查看路由中的信息', this.$route.meta);
    this.newRoute();
  },
  methods: {
    newRoute() {
      categoryApi().then((res) => {
        // console.log('拿到所有的类目信息', res);
        this.categoryList = res.data;
        this.categoryList.forEach((item) => {
          if (item.name === this.$route.params.editFormData.category) {
            this.$route.params.editFormData.category = item.id;
          }
        });
        // console.log('更改完信息了，查看路由的category的值', this.$route.params);
        // 编辑回填，传递新的产品数据
        productApi.edit(this.$route.params.editFormData).then(
          (data) => {
            console.log('编辑回填api拿到数据', data);
            if (data.data) {
              this.formData = this.$route.params.editFormData;
              //   this.$message.success('获取回填数据成功！');
              console.log('获取回填数据成功', this.formData);
            }
          },
        );
      });
    },
  },

};
</script>

<style>

</style>
