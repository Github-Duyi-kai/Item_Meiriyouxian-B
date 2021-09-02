<template>
  <div class="productAdd-container">
    <!--步骤条 -->
    <a-steps :current="current" class="steps-header">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>

    <!-- 步骤条的内容区 -->
    <div class="steps-content">
      <Basic-detail v-if="current === 0" @basicSubmit="basicSubmit" :addForm="addForm" />
      <Sale-detail
        v-else-if="current === 1"
        @onBack="current -= 1"
        :addForm="addForm"
        @onReset="saleReset"
        @onSubmit="submit"
      />
    </div>

    <!-- 按钮 -->
    <div class="steps-action">
      <!-- 下一步 -->
      <!-- <a-button v-if="current < steps.length - 1" type="primary" @click="next">
        下一步
      </a-button> -->
      <!-- 完成 -->
      <!-- <a-button
        v-if="current == steps.length - 1"
        type="primary"
        @click="$message.success('Processing complete!')"
      >
        Done
      </a-button> -->
      <!-- 返回上一步 -->
      <!-- <a-button v-if="current > 0" style="margin-left: 8px" @click="prev">
        Previous
      </a-button> -->
    </div>
  </div>
</template>
<script>
import BasicDetail from '@/views/layout/components/basicDetail.vue';
import SaleDetail from '@/views/layout/components/saleDetail.vue';
import productApi from '@/api/product';

export default {
  components: {
    BasicDetail,
    SaleDetail,
  },
  props: ['editFormData'],
  data() {
    return {
      current: 0,
      steps: [
        {
          title: '填写商品基本信息',
        },
        {
          title: '填写商品销售信息',
        },
      ],
      addForm: {
        //   basicDetail
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: ['包邮，最晚次日达'],
        // saleDetail
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        status: true,
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        images: {
          previewVisible: false,
          previewImage: '',
          fileList: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
        },
      },
    };
  },
  methods: {
    next() {
      this.current += 1;
    },
    prev() {
      this.current -= 1;
    },
    basicSubmit(formData) {
      //   console.log('productAdd组件拿到了数据', res);
      console.log('拿到了第一部分表单提交的结果', formData);
      //   this.form = this.$route.meta.formEditData;
      //   console.log('更改过后form的数据>>>>>>', this.form);
      //   console.log('&&&&&&直接拿路由数据', this.$route.meta.formEditData);
      this.addForm = {
        ...this.addForm,
        formData,
      };
      this.current += 1;
    },
    saleReset() {
      this.addForm = {
        //   basicDetail
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: ['包邮，最晚次日达'],
        // saleDetail
        price: '',
        price_off: '',
        inventory: '',
        unit: '',
        status: true,
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        images: {
          previewVisible: false,
          previewImage: '',
          fileList: [
            {
              uid: '-1',
              name: 'image.png',
              status: 'done',
              url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
            },
          ],
        },
      };
    },
    submit(data) {
      console.log('最终提交，表单结果', data);
      productApi.add(data).then((res) => {
        if (this.$router.currentRoute.path.includes('edit')) {
          this.$message.success('产品编辑成功！');
        } else {
          this.$message.success('新增商品成功！');
          console.log('提交成功，拿到结果', res);
        }
        this.$router.push({
          name: 'ProductList',
        });
      });
    },
  },
  created() {
    if (this.$route.path.includes('edit')) {
      console.log('edit》》》》》', this.$route);
      this.addForm = this.$route.params.editFormData;
      console.log(
        '拿到点击编辑后改变的数据', this.addForm,
        '拿到存储在路由中的信息', this.$route.params.editFormData,
        '查看传递过来的表格数据', this.editFormData,
      );
    }
  },
};
</script>
<style scoped lang="less">
.productAdd-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .steps-header {
    //  background-color: white;
    padding: 30px 200px;
    border-bottom: 1px dashed lightblue;
  }
  .steps-content {
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: center;
    padding-top: 20px;
    align-self: start;
    width: 100%;
  }

  .steps-action {
    margin-top: 24px;
  }
}
</style>
