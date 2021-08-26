<template>
  <div class="productList-container">
        <!-- 表单搜索 -->
        <Search @submit="searchSubmit"  :categoryList='categoryList'/>
        <!-- 表格 -->
        <products-table :formData="formData" :page="page" @pageChange='tablePageChange' />
  </div>
</template>

<script>
import ProductsTable from '../../components/productsTable.vue';
import Search from '../../components/search.vue';
import ProductsApi from '@/api/product';
import categoryApi from '@/api/category';

export default {
  components: { Search, ProductsTable },
  data() {
    return {
      searchForm: {},
      formData: [],
      page: {
        current: 1,
        total: 0,
        showSizeChanger: true,
        pageSize: 10,
      },
      categoryList: [],
      categoryObj: [], // 做一个类目的映射，为了处理表格内容的category，将数字变成内容
    };
  },
  async created() {
    // 获取表格类目数据
    await categoryApi().then((res) => {
      console.log('拿到category列表', res);
      this.categoryList = res.data;
      res.data.forEach((item) => {
        this.categoryObj[item.id] = item.name;
      });
    });
    //   等获取到表格类目之后再获取表格数据
    this.getTableData();
  },
  methods: {
    searchSubmit(form) {
      console.log('拿到了搜索表单传过来的结果：', form);
      this.searchForm = form;
    },
    getTableData() {
      ProductsApi({
        ...this.searchForm,
      }).then((res) => {
        console.log('拿到了产品列表', res);
        this.page.total = res.total;
        const resultData = res.data.map((item) => ({
          ...item,
          key: item.id,
        }));
        // console.log('映射成功', this.categoryObj);
        const newResultData = resultData.map((item) => ({
          ...item,
          category: this.categoryObj[item.category],
        }));
        // console.log('处理过后的数组', newResultData);
        this.formData = newResultData;
      });
    },
    tablePageChange(val) {
      this.page = val;
    },
  },
};
</script>

<style>
</style>
