<template>
  <a-form-model
    :model="form"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
    ref="saleForm"
  >
    <a-form-model-item label="商品售价" prop="price">
      <a-input v-model="form.price" placeholder="请输入商品售价" type="number" />
    </a-form-model-item>
    <a-form-model-item label="商品折扣价" prop="price_off">
      <a-input v-model="form.price_off" type="number" placeholder="请输入商品折扣价" />
    </a-form-model-item>
    <a-form-model-item label="商品库存" prop="inventory">
      <a-input v-model="form.inventory" type="number" placeholder="请输入商品库存" />
    </a-form-model-item>
    <a-form-model-item label="计量单位" prop="unit">
      <a-select v-model="form.unit" placeholder="请选择计量单位" @change="changeUnit">
        <a-select-option :value="c" v-for="c in unitList" :key="c">
          {{ c }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item label="商品相册" prop="images">
      <div class="clearfix">
        <a-upload
          :action="`https://mallapi.duyiedu.com/upload/images?appkey=${$store.state.userInfo.appkey}`"
          list-type="picture-card"
          :file-list="form.images.fileList"
          @preview="handlePreview"
          @change="handleChange"
          name="avatar"
        >
          <div v-if="form.images.fileList&&form.images.fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">
              Upload
            </div>
          </div>
          <div v-else>
                 <a-icon type="plus" />
                 <div class="ant-upload-text">
                  Upload
            </div>
          </div>
        </a-upload>
        <a-modal :visible="form.images.previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="form.images.previewImage" />
        </a-modal>
      </div>
    </a-form-model-item>
    <a-form-model-item label="是否上架" prop="status">
      <a-switch
        v-model="form.status"
        style="float:left;margin-top:10px;margin-left:3px"
        @click="statusChange"
      />
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="dashed" @click="onBack"> 上一步 </a-button>
      <a-button style="margin-left: 10px" @click="onReset" type="danger"> 重置 </a-button>
      <a-button style="margin-left: 10px" type="primary" @click="onSubmit"> 提交 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
// import productApi from '@/api/product';

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default {
  props: ['addForm'],
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      unitList: ['g', 'kg', '个', '瓶', '包', '条', '把'],
      rules: {
        price: [
          { required: true, message: '请输入商品售价', trigger: 'blur' },
        ],
        price_off: [{ required: true, message: '请输入商品折扣价', trigger: 'blur' }],
        inventory: [{ required: true, message: '请输入商品库存', trigger: 'blur' }],
        unit: [{ required: true, message: '请选择计量单位', trigger: 'blur' }],
        images: [{ required: true, message: '请上传图片', trigger: 'blur' }],
      },
      form: [],
    };
  },
  created() {
    console.log('有没有传过来', this.addForm);
    console.log('第二部分拿到数据', this.form);
    if (this.$router.currentRoute.path.includes('edit')) {
      // 说明当前是编辑页面
      let arr = [];
      console.log('+++++', this.$route.params);
      arr = this.$route.params.editFormData.images.map((item, index) => ({
        uid: index,
        name: `mage-${index}.png`,
        status: 'done',
        url: item,
      }));
      console.log('看一下第二部分的arr', arr);
      // console.log(this.$route.params.editFormData.images);
      this.form = {
        ...this.addForm,
        images: {
          previewVisible: true,
          previewImage: arr[0].url,
          fileList: arr,
        },
      };
    } else {
      // 当前是添加商品页面
      this.form = this.addForm;
    }
  },
  methods: {
    onSubmit() {
      this.$refs.saleForm.validate((valid) => {
        if (valid) {
        //   console.log('最终提交的内容!', this.form);
          this.$message.success('提交成功！');
          this.$emit('onSubmit', this.form);
        } else {
          this.$message.error('提交失败，请重新校验信息!');
        }
        return false;
      });
    },
    statusChange() {
      // true or false
    //   商品上下架
    //   console.log('信息改变', res);
    },
    handleCancel() {
      this.form.images.previewVisible = false;
    },
    async handlePreview(file) {
      // 点击文件链接或预览图标时的回调
      const text = file;
      //   console.log('file', file);
      if (!text.url && !text.preview) {
        text.preview = await getBase64(text.originFileObj);
      }
      this.form.images.previewImage = text.url || text.preview;
      this.form.images.previewVisible = true;
    },
    handleChange({ fileList }) {
    //   console.log('&&&&&&&查看fileList', this.form.images.fileList);
    //   console.log('fileList', fileList);
    //   console.log('三个参数之一event，返回', event);
    //   console.log('三个参数之一file，记录图片的信息', file);
    //   console.log('点击了文件上传');
      this.form.images.fileList = fileList;
    },
    changeUnit() {
    //   console.log('改变计量单位', res);
    },
    onBack() {
      this.$emit('onBack');
    },
    onReset() {
      // 重置表单内容
      this.$emit('onReset');
    },
  },
};
</script>
