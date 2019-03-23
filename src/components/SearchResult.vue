<template>
  <div class="search-result" v-wechat-title="this.title">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <h1>搜索结果页</h1>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'SearchResult',
  data () {
    return {
      title: '搜索结果'
    }
  },
  created () {
    let b = 'blabla'
    if (this.$route.params.wd) {
      b = this.$route.params.wd
    }
    console.log(b)
  }
}
</script>

<style scoped>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
