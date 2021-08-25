<template>
  <div class="login-container">
    <a-form-model
      ref="LoginForm"
      :model="LoginForm"
      :rules="rules"
      v-bind="layout"
      class="login-form"
    >
      <a-form-model-item has-feedback label="邮箱" prop="email">
        <a-input v-model="LoginForm.email" type="email" autocomplete="off" />
      </a-form-model-item>
      <a-form-model-item has-feedback label="密码" prop="password">
        <a-input
          v-model="LoginForm.password"
          type="password"
          autocomplete="off"
        />
      </a-form-model-item>
      <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="submitForm('LoginForm')">
          提交
        </a-button>
        <a-button style="margin-left: 10px" @click="resetForm('LoginForm')">
          重置
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import userApi from '@/api/user';

export default {
  data() {
    const emailReg = /^[\w-]+@[\w.-]+.com$/;
    const checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱！'));
      }
      if (emailReg.test(value)) {
        return callback();
      }
      return callback('邮箱格式不正确，请核对！');
    };
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      LoginForm: {
        password: '',
        email: '',
      },
      rules: {
        password: [{ validator: validatePass, trigger: 'change' }],
        email: [{ validator: checkEmail, trigger: 'change' }],
      },
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 },
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 如果校验成功，valid为true，这时候要做的事情是跳转页面
          userApi
            .Login(this.LoginForm)
            .then((config) => {
              this.$store.dispatch('changeUserInfo', config.data.data);
              if (config.data && config.data.status === 'success') {
                this.$router.push({
                  name: 'Home',
                });
              }
            })
            .catch((err) => Promise.reject(err));
        }
        return false;
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style lang="less" scoped>
@import url("~@/assets/css/login.less");
</style>
