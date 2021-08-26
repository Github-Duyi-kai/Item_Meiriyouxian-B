<template>
  <a-form-model layout="inline"
  :model="searchForm"
  @submit="handleSubmit"
  @submit.native.prevent
  class="search-container">
    <a-form-model-item class="search-box" label="请输入关键字：">
        <!-- 搜索框 -->
      <a-input v-model="searchForm.searchWord" placeholder="请输入关键字">
        <a-icon slot="prefix" type="search" style="color:rgba(0,0,0,.25)" />
      </a-input>
    </a-form-model-item>
    <a-form-model-item label="商品类目：">
        <!-- 下拉列表 -->
      <a-select
    show-search
    placeholder="请选择商品类目"
    option-filter-prop="children"
    style="width: 200px"
    @change="handleChange"
    allowClear
  >
    <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
         <a-icon type="sketch" />
      {{c.name}}
    </a-select-option>
  </a-select>
    </a-form-model-item>
    <a-form-model-item>
        <!-- 按钮 -->
      <a-button
        type="primary"
        html-type="submit"
      >
        搜索
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>

export default {
  data() {
    return {
      searchForm: {
        searchWord: '',
        category: '',
      },
    };
  },
  props: ['categoryList'],
  created() {

  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.searchForm);
    },
    // 以下都是下拉菜单的方法
    handleChange(value) {
      this.searchForm.category = value;
    },
  },
};
</script>

<style lang="less" scoped>
.search-container{
    display: flex;
    margin: 10px;

}
</style>
