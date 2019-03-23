<template>
  <div class="not-found" v-wechat-title="this.title">
    <div class="page-body">
      <el-row :gutter="10">
        <el-col class="el-col-xs-offset-2 el-col-sm-offset-8 el-col-md-offset-8 el-col-lg-offset-8 el-col-xl-offset-9"
                :xs="20" :sm="8" :md="8" :lg="8" :xl="6">
          <div>
            <img src="../assets/notFound.png" alt="404">
            <!--<h1>对不住，兄弟，这页没了</h1>-->
            <h3>试试
              <router-link to="/Home">去首页</router-link>
            </h3>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'notFound',
  data () {
    return {
      title: '404'
    }
  }
}
</script>

<style scoped>
.not-found {
  text-align: center;
}
.not-found img{
  width: 100%;
  top: 50px;
}
.page-body {
  padding-top: 60px;
}
</style>
