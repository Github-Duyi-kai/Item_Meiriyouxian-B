<template>
  <div class="productAdd-container">
    <!--步骤条 -->
    <a-steps :current="current" class="steps-header">
      <a-step v-for="item in steps" :key="item.title" :title="item.title" />
    </a-steps>

    <!-- 步骤条的内容区 -->
    <div class="steps-content">
      <basic-detail v-if="current === 0" @onSubmit="basicSubmit" :form="form" />
      <sale-detail
        v-else-if="current === 1"
        @onBack="current -= 1"
        :form="form"
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
import basicDetail from '@/views/layout/components/basicDetail.vue';
import saleDetail from '@/views/layout/components/saleDetail.vue';

export default {
  components: {
    basicDetail,
    saleDetail,
  },
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
      form: {
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
    basicSubmit() {
      this.current += 1;
      //   console.log('productAdd组件拿到了数据', res);
    },
    saleReset() {
      this.form = {
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
    },
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
