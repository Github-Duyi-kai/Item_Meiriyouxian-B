<template>
  <div class="productList-container">
        <!-- 表单搜索 -->
        <Search @submit="searchSubmit"  :categoryList='categoryList'/>
        <!-- 表格 -->
        <products-table :formData="formData" :page="page" @pageChange='tablePageChange'
        @productRemove='productRemove'/>
        <!-- 新增商品按钮 -->
        <a-button type="primary" shape="round" icon="plus-circle" @click="addButtonClick" >
               新增商品
        </a-button>
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
    //   console.log('拿到category列表', res);
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
    //   console.log('拿到了搜索表单传过来的结果：', form);
      this.searchForm = form;
      //   获取数据了之后要重新调用api来获取表格数据，否则没有反应，不会渲染
      this.getTableData();
    },
    getTableData() {
      ProductsApi.list({
        ...this.searchForm,
      }).then((res) => {
        // console.log('拿到了产品列表', res);
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
    addButtonClick() {
    //   console.log('点击了添加按钮，并拿到了', val);
      this.$router.push({
        name: 'ProductAdd',
      });
    },
    productRemove(record) {
      this.$confirm({
        title: '确认删除？',
        content: () => <div style='color:green'>
              {'确定删除产品标题为'}
              <span style='color:red'>{`${record.title}`} </span>
              <span>{'的产品吗？'} </span>,
          </div>,
        onOk: () => {
        //   console.log('确认删除', record);
          ProductsApi.remove({ id: record.id }).then(() => {
            this.$message.success('删除成功！');
            // 删除成功之后，要重新调用方法获取数据，否则无法重新渲染表格
            this.getTableData();
          });
        },
        onCancel() {
          // 点击退出之后的操作
          return true;
        },
        class: 'confirm-box',
      });
    },
  },
};
</script>

<style lang="less" scoped>
.productList-container{
    position: relative;
    &>.ant-btn{
       position: absolute;
       background-color: burlywood;
       box-shadow: 0 0 10px yellow;
       color: green;
       right: 100px;
       top: 5px;
    }
}
</style>
