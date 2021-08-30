<template>
  <a-form-model
           :model="form"
           :label-col="labelCol"
           :wrapper-col="wrapperCol"
           :rules="rules"
           ref="ruleForm"
    >
    <a-form-model-item label="副标题" prop="title">
      <a-input v-model="form.title" />
    </a-form-model-item>

    <a-form-model-item label="商品描述" prop="desc">
      <a-input v-model="form.desc" type="textarea" />
    </a-form-model-item>

    <a-form-model-item label="商品类目" prop="category">
      <a-select v-model="form.category" placeholder="请输入类目" @change="changeCategory">
        <a-select-option :value="c.id" v-for="c in categoryList" :key="c.id">
          {{ c.name }}
        </a-select-option>
      </a-select>
      <a-select v-model="form.c_items" placeholder="请输入子类目">
        <a-select-option :value="a" v-for="a in categoryItems" :key="a">
          {{ a }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item label="标签" prop="tags">
      <a-select
        mode="tags"
        placeholder="请输入标签"
        :default-value="['包邮，最晚次日达']"
        @change="handleChange"
        v-model="form.tags"
      >
        <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
          {{ (i + 9).toString(36) + i }}
        </a-select-option>
      </a-select>
    </a-form-model-item>

    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button type="primary" @click="onSubmit"> 下一步 </a-button>
      <a-button style="margin-left: 10px" @click="onReset"> 重置 </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
import categoryApi from '@/api/category';

export default {
  props: ['form'],
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 14 },

      categoryList: [],
      categoryItems: [],
      rules: {
        title: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        desc: [{ required: true, message: '请输入描述', trigger: 'blur' }],
        category: [
          {
            type: 'number',
            required: true,
            message: '请选择类目',
            trigger: 'blur',
          },
        ],
        tags: [{ required: true, message: '请输入标签', trigger: 'blur' }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.$message.success('提交成功！');
          this.$emit('onSubmit', this.form);
        } else {
          this.$message.error('提交失败，请重新校验信息!');
        }
        return false;
      });
    //   console.log('submit!', this.form);
    },
    handleChange() {
    //   console.log('单选框点击了', res);
    },
    changeCategory(res) {
    //   console.log('拿到结果', res);
    //   console.log('$', this.categoryList);
      for (let i = 0; i < this.categoryList.length; i += 1) {
        if (this.categoryList[i].id === res) {
          this.categoryItems = this.categoryList[i].c_items;
        }
      }
    },
    onReset() {
      this.form = {
        title: '',
        desc: '',
        category: '',
        c_items: [],
        tags: ['包邮，最晚次日达'],
      };
    },
  },
  created() {
    categoryApi().then((res) => {
      this.categoryList = res.data;
    //   console.log('获取到类目列表', res);
    });
  },
};
</script>
