<template>
  <!-- 面包屑导航 -->
  <div>
    <el-breadcrumb class="app-levelbar" separator="/">
      <el-breadcrumb-item v-for="(item,index)  in levelList"  :key="item.id">
        <router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
        <router-link v-else :to="item.path">{{item.name}}</router-link>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
    export default {
      created() {
        this.getBreadcrumb()
      },
      data() {
        return {
          levelList: null
        }
      },
      methods: {
        getBreadcrumb() {
          let matched = this.$route.matched.filter(item => item.name);
          const first = matched[0];
          if (first && (first.name !== '首页' || first.path !== '')) {
            matched = [{ name: '首页', path: '/index/readme' }].concat(matched)
          }
          this.levelList = matched;
        }
      },
      watch: {
        $route() {
          this.getBreadcrumb();
        }
      }
    }
</script>

<style scoped>
    .app-levelbar.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        .no-redirect{
          color: #97a8be;
          cursor:text;
        }
    }
</style>
