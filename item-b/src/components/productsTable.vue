<template>
  <a-table :columns="columns" :data-source="formData" :pagination='page'  @change="pageChange">
    <div slot="operation" >
        <a-button type="primary">编辑</a-button>
        <a-button type="danger">删除</a-button>
    </div>
  </a-table>
</template>
<script>
// 表头信息
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    width: 80,
  },
  {
    title: '标题',
    dataIndex: 'title',
    key: 'title',
    ellipsis: true,
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc',
    ellipsis: true,
  },
  {
    title: '类目',
    dataIndex: 'category',
    key: 'category',
    ellipsis: true,
  },
  {
    title: '预售价',
    dataIndex: 'price',
    key: 'price',
    ellipsis: true,
  },
  {
    title: '折扣价',
    dataIndex: 'price_off',
    key: 'price_off',
    ellipsis: true,
  },
  {
    title: '标签',
    dataIndex: 'tags',
    key: 'tags',
    ellipsis: true,
  },
  {
    title: '限制购买数量',
    dataIndex: 'inventory',
    key: 'inventory',
    ellipsis: true,
  },
  {
    title: '上架状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    customRender(text, record) {
    //   console.log(text, record, index);
      return record.status === 1 ? '上架' : '下架';
    },
  },
  {
    title: '操作',
    dataIndex: 'operation',
    key: 'operation',
    scopedSlots: { customRender: 'operation' },

  },
];
// 所有的表格数据

export default {
  data() {
    return {
      columns,
    };
  },
  props: ['formData', 'page'],
  methods: {
    pageChange(val) {
    //   console.log('页码改变了', val);
      this.$emit('pageChange', val);
    },
  },
};
</script>
