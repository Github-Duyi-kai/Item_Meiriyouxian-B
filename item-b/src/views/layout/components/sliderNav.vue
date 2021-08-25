<template>
  <div class="main-header">
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.matched.length>0">
        <a-breadcrumb-item>{{currentRoute.matched[0].meta.title}}</a-breadcrumb-item>
        <a-breadcrumb-item>
        <a href>{{currentRoute.matched[1].meta.title}}</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <ul class="user-info">
      <li class="userInfoWelcome">
        {{
          $store.state.welcome === false
            ? `欢迎${this.$store.state.userInfo.username}`
            : "未登录"
        }}
        <a-icon type="down" />
      </li>
      <li class="userInfoShow" v-if="$store.state.userInfoLi">
        权限："{{ $store.state.userInfo.role }}"
      </li>
      <li class="userInfoShow" v-if="$store.state.userInfoLi">
        appkey："{{ $store.state.userInfo.appkey }}"
      </li>
      <li class="userInfoShow" v-if="$store.state.userInfoLi">
        邮箱："{{ $store.state.userInfo.email }}"
      </li>
      <li
        style="color: red"
        @click="logOut"
        class="userInfoShow"
        v-if="$store.state.userInfoLi"
      >
        退出
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: {
        matched: [{
          path: '/home',
          name: 'Home',
          meta: {
            title: '首页',
            icon: 'home',
          },
        }, {
          path: '/index',
          name: 'Index',
          meta: {
            title: '统计',
            icon: 'number',
          },
        }],
      },
    };
  },
  watch: {
    $route() {
    //   console.log(this.$router.matched);
      this.currentRoute.matched = this.$router.currentRoute.matched;
    },
  },
  methods: {
    toggleCollapsed() {
      this.$store.dispatch('changeCollapsed');
    },
    logOut() {
      this.$store.dispatch('logOut');
      this.$router.push({
        name: 'Login',
      });
      //   document.getElementsByClassName('userInfoWelcome')[0].innerHTML = '未登录';
      //   const arr = document.querySelectorAll('.userInfoShow');
      //   for (let i = 0; i < arr.length; i++) {
      //     document.getElementsByClassName('user-info')[0].removeChild(arr[i]);
      //   }
    },
  },
};
</script>
