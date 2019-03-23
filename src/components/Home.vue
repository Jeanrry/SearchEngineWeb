<template>
  <div class="home" v-wechat-title="this.title">
    <div class="home__header">
      <el-button class="search-setting" type="text" @click="searchSettingDialogVisible = true">搜索设置</el-button>
    </div>
    <el-scrollbar style="height: 100%">
          <el-row class="logo-body">
            <el-col
              class="el-col-xs-offset-10 el-col-sm-offset-10 el-col-md-offset-10 el-col-lg-offset-10 el-col-xl-offset-11"
              :xs="4" :sm="4" :md="4" :lg="4" :xl="2">
              <div>
                <img src="../assets/logo.png" alt="logo">
              </div>
            </el-col>
          </el-row>
          <el-row class="search-body">
            <el-col
              class="el-col-xs-offset-1 el-col-sm-offset-2 el-col-md-offset-6 el-col-lg-offset-6 el-col-xl-offset-8"
              :xs="22" :sm="20" :md="12" :lg="12" :xl="8">
              <el-row>
                <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="20">
                  <el-input v-if="!searchPrompt" v-model="searchInput" class="search-input" autofocus></el-input>
                  <el-autocomplete
                    v-if="searchPrompt"
                    style="width: 100%"
                    class="inline-input"
                    v-model="searchInput"
                    :fetch-suggestions="handleInputChange"
                    placeholder=""
                    :trigger-on-focus="false"
                    @select="handleSelect"
                    autofocus>

                  </el-autocomplete>
                </el-col>
                <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="4">
                  <el-button type="primary" icon="el-icon-search" @click="handleSearchSubmit">搜索</el-button>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
    </el-scrollbar>

    <el-dialog title="搜索设置" :visible.sync="searchSettingDialogVisible" width="600px">
      <el-form>
        <el-form-item label="搜索框提示" :label-width="formLabelWidth">
          <el-tooltip placement="top">
            <div slot="content">我这么说吧<br/>这个功能我们压根没准备做</div>
            <el-checkbox v-model="searchPrompt" disabled>显示</el-checkbox>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="searchSettingDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="searchSettingDialogVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      title: '鼓捣搜索', // 页面title
      searchInput: '', // 搜索框 input 绑定数据
      searchPrompt: true, // 搜索联想是否显示
      searchSettingDialogVisible: false, // 搜索设置框是否显示
      formLabelWidth: '120px'// 搜索设置框宽度
    }
  },
  created () {
    sessionStorage.setItem('token', 'blabla')
    this.testFunc()
  },
  methods: {
    testFunc () {
      let postData = {
        username: 'yanglao20',
        password: '25d55ad283aa400af464c76d713c07ad',
        blalba: true,
        blablabla: 12
      }
      this.postRequest('/rest/elder/login', postData).then(resp => {
        console.log(resp)
      })
    },
    // 监测input搜索框值改变，可用于联想搜索
    handleInputChange (queryString, cb) {
      let results = [
        { 'value': '三全鲜食（北新泾店）' },
        { 'value': 'Hot honey 首尔炸鸡（仙霞路）' }
      ]
      // 调用 callback 返回建议列表的数据
      cb(results)
    },

    // 点击某一条搜索建议
    handleSelect (item) {
      console.log(item.value)
      this.$router.push(
        {name: 'SearchResult', params: { wd: item.value }})
    },

    // 搜索按钮触发事件
    handleSearchSubmit () {
      // console.log(this.searchInput)
    }
  }
}
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100%;
    background-image: url('../../static/bg.jpg');
    background-size: cover;
    background-attachment: fixed;
  }
  .home img{
    width: 100%;
    top: 50px;
  }
  .home__header{
    width: 100%;
    height: 40px;
    text-align: right;
    background: rgba(0, 0, 0, 0.2);
  }
  .search-setting {
    padding-right: 20px;
    color: #fafafa;
  }
  .logo-body {
    padding-top: 150px;
  }
  .search-body {
    padding-bottom: 200px;
  }
</style>
