<template>
  <div class="home" v-wechat-title="this.title">
    <div class="home__header">
      <ugly-button class="search-setting" text @click="searchSettingDialogVisible = true">搜索设置</ugly-button>
    </div>
    <ugly-vertical-scrollbar style="height: 100%">
      <ugly-row class="logo-body">
        <ugly-column
          class="offset-xs-8 offset-sm-8 offset-md-8 offset-lg-9 offset-xl-9 col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2">
          <div>
            <img src="../assets/logo.png" alt="logo">
            <!--<h1>小胖搜索</h1>-->
          </div>
        </ugly-column>
      </ugly-row>
      <!--<img src="https://media.st.dl.bscstorage.net/steam/apps/629760/header.jpg"/>-->
      <ugly-row class="search-body">
        <ugly-column class="offset-xs-1 offset-sm-2 offset-md-4 offset-lg-5 offset-xl-6 col-xs-18 col-sm-16 col-md-12 col-lg-10 col-xl-8">
          <ugly-row>
            <ugly-column class="col-xs-17 col-sm-18 col-md-18 col-lg-18 col-xl-18">
              <el-input
                v-if="!searchPrompt"
                v-model="searchInput"
                class="search-input"
                autofocus
                @keyup.enter.native="handleSearchSubmit">

              </el-input>
              <el-autocomplete
                v-if="searchPrompt"
                v-model="searchInput"
                style="width: 100%"
                class="inline-input"
                :fetch-suggestions="handleInputChange"
                placeholder=""
                autofocus
                :trigger-on-focus="false"
                @select="handleSelect"
                @keyup.enter.native="handleSearchSubmit">

              </el-autocomplete>
            </ugly-column>
            <ugly-column class="col-xs-3 col-sm-2 col-md-2 col-lg-2 col-xl-2">
              <el-button type="primary" class="search-button" ref="searchInputBtn" icon="el-icon-search" @click="handleSearchSubmit">搜索</el-button>
            </ugly-column>
          </ugly-row>
        </ugly-column>
      </ugly-row>
      <!--<div style="height: 2000px"></div>-->
    </ugly-vertical-scrollbar>

    <el-dialog title="搜索设置" :visible.sync="searchSettingDialogVisible" width="600px">
      <el-form>
        <el-form-item label="搜索框提示" :label-width="formLabelWidth">
          <el-tooltip placement="top">
            <div slot="content">我这么说吧<br/>这个功能我们压根没准备做</div>
            <el-checkbox v-model="searchPrompt" @change="handleCheckboxChange">显示</el-checkbox>
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
import crypto from 'crypto'

export default {
  name: 'Home',
  data () {
    return {
      title: '小胖儿搜索', // 页面title
      searchInput: '', // 搜索框 input 绑定数据
      searchPrompt: false, // 搜索联想是否显示
      searchSettingDialogVisible: false, // 搜索设置框是否显示
      formLabelWidth: '120px', // 搜索设置框宽度
      searchWord: '' // 搜索关键字在session中的参数？
    }
  },
  created () {
    sessionStorage.setItem('token', 'blabla')

    let myDate = new Date()
    let md5 = crypto.createHash('md5')
    md5.update(myDate.getTime().toString())
    this.searchWord = md5.digest('hex')

    this.searchPrompt = sessionStorage.getItem('searchPrompt') !== 'false'
  },
  methods: {
    testFunc () {
      let postData = {
        username: 'yanglao20',
        password: '25d55ad283aa400af464c76d713c07ad'
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
      // console.log(item.value)
      // sessionStorage.setItem(this.searchWord, item.value)
      // this.$router.push({name: 'SearchResult', params: {searchVariable: this.searchWord}})
      // this.$router.push({path: 'searchResult/' + this.searchWord})
      this.searchInput = item.value
      this.$refs.searchInputBtn.handleClick()
    },

    // 搜索按钮触发事件
    handleSearchSubmit () {
      // console.log(this.searchInput)
      sessionStorage.setItem(this.searchWord, this.searchInput)
      // this.$router.push({name: 'SearchResult', params: {searchVariable: this.searchWord}})
      this.$router.push({path: '/searchResult/' + this.searchWord})
    },

    // 监测搜索建议设置Checkbox变化
    handleCheckboxChange (val) {
      if (val) {
        sessionStorage.setItem('searchPrompt', 'true')
      } else {
        sessionStorage.setItem('searchPrompt', 'false')
      }
    }
  }
}
</script>

<style>
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
    margin-right: 20px;
    color: #fafafa;
  }
  .logo-body {
    padding-top: 150px;
  }
  .search-body {
    padding-bottom: 200px;
  }
  .search-input {
    border-radius: 0;
  }
  .search-input input {
    border-radius: 0;
  }
  .search-button {
    border-radius: 0;
  }
</style>
