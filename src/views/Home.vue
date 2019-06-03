<template>
  <div class="home" :class="homeClass" v-wechat-title="this.title">
    <div v-if="!searchResultDisabled" class="home__header">
      <ugly-button class="search-setting" text @click="searchSettingDialogVisible = true">搜索设置</ugly-button>
    </div>
    <!--{{ windowWidth }}-->
    <div :class="searchBody">
      <ugly-column :class="searchBodyLogo">
        <h1>小胖儿搜索</h1>
        <img class="logo" src="../assets/logo.png" alt="logo">
      </ugly-column>
      <ugly-column :class="searchBodyInput">
        <ugly-row>
          <!--搜索框起-->
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
          <!--搜索框止-->
          <!--搜索按钮起-->
          <ugly-column class="col-xs-3 col-sm-2 col-md-2 col-lg-2 col-xl-2">
            <el-button type="primary" class="search-button" ref="searchInputBtn" icon="el-icon-search"
                       @click="handleSearchSubmit">搜索
            </el-button>
          </ugly-column>
          <!--搜索按钮止-->
        </ugly-row>
      </ugly-column>
    </div>

    <ugly-vertical-scrollbar v-if="searchResultDisabled" style="width: 100%; padding: 0 20px; box-sizing:border-box;" :style="{ height: windowWidth + 'px' }">
      <ugly-row>
        <!--搜索来源-->
        <ugly-column class="offset-lg-2 offset-xl-3 col-xs-20 col-sm-4 col-md-4 col-lg-3 col-xl-2" style="padding-right: 20px; text-align: right">
          <ul>
            <li class="base-web-checker" v-for="i in baseWebList" :key="i.id" @click="handleBaseWebListOnclick(i.keyword)">
              <span class="iconfont" :class="i.icon"> {{ i.label }}</span>
            </li>
          </ul>
        </ugly-column>
        <!--搜索结果-->
        <ugly-column class="col-xs-20 col-sm-12 col-md-12 col-lg-10 col-xl-10">
          <p class="total-data">拢共搜到了差不离{{ total }}条数据</p>

          <div v-for="i in dataRows" :key="i._id" class="result-list">
            <a :href="i._source.game_url" target="_blank">
              <img v-if="i._source.game_img" class="result-list__img" :src="i._source.game_img" alt="">
              <div class="result-list__summary">
                <h3 v-if="i._source.game_name" v-text="i._source.game_name" class="result-list__game-name"></h3>
                <p v-if="i._source.release_date" class="result-list__release-date">发行于：{{ i._source.release_date }}</p>
                <p v-if="i._source.game_summary" v-text="i._source.game_summary" class="result-list__game-summary"></p>
                <div class="result-list__game-price">
                  <s v-if="i._source.game_price_old" v-text="i._source.game_price_old"></s>
                  <h2 v-if="i._source.game_price" v-text="i._source.game_price"></h2>
                </div>
                <div v-if="i._source.review_list" class="result-list__comment">
                  <div v-for="comment in 3" :key="comment" class="result-list__comment__item">
                    {{ i._source.review_list[comment] }}
                  </div>
                </div>
              </div>
            </a>
          </div>

          <!--<div v-for="i in dataRows" :key="i.id" style="width: 100%; padding-bottom: 20px">-->
          <!--<a :href="i.url" target="_blank" style="font-size: 18px;" v-html="changeColor(i.title)"></a>-->
          <!--<br/>-->
          <!--<a :href="i.url" target="_blank" style="font-size: 16px;" v-html="i.shortUrl"></a>-->
          <!--<p style="font-size: 16px;"-->
          <!--v-html="i.timeFactor + changeColor(i.summary)"></p>-->
          <!--</div>-->
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage"
            :page-size="20"
            layout="prev, pager, next"
            :total="total">
          </el-pagination>
        </ugly-column>
        <!--热搜-->
        <ugly-column class="col-xs-0 col-sm-4 col-md-4 col-lg-3 col-xl-2" style="background-color: #409eff">
        </ugly-column>
      </ugly-row>
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
      searchResultDisabled: false, // 搜索结果可见性
      searchInput: '', // 搜索框 input 绑定数据
      searchPrompt: false, // 搜索联想是否显示
      searchSettingDialogVisible: false, // 搜索设置框是否显示
      formLabelWidth: '120px', // 搜索设置框宽度
      searchWord: '', // 搜索关键字在session中的参数？
      searchKeyWord: [], // 搜索关键字
      dataRows: [], // 返回数据
      currentPage: 1, // 当前页码
      total: 0, // 总数据量
      yuezhi: 0, // 数据量约值
      windowWidth: 0,
      baseWeb: ['steam', 'uplay'],
      baseWebList: [
        {
          id: 0,
          label: 'steam',
          icon: 'icon-steam',
          keyword: 'steam'
        },
        {
          id: 1,
          label: 'uplay',
          icon: 'icon-ubicom',
          keyword: 'uplay'
        },
        {
          id: 2,
          label: 'wegame',
          icon: 'icon-wegame',
          keyword: 'wegame'
        }
      ]
    }
  },
  computed: {
    homeClass () {
      return {
        'home--search-result-show': this.searchResultDisabled,
        'home--search-result-hide': !this.searchResultDisabled
      }
    },
    searchBody () {
      return {
        'searchBody--search-result-show': this.searchResultDisabled,
        'searchBody--search-result-hide': !this.searchResultDisabled
      }
    },
    searchBodyLogo () {
      return {
        'logo-body--search-result-hide offset-xs-8 offset-sm-8 offset-md-8 offset-lg-9 offset-xl-9 col-xs-4 col-sm-4 col-md-4 col-lg-2 col-xl-2': !this.searchResultDisabled,
        'logo-body--search-result-show offset-lg-2 offset-xl-3 col-xs-0 col-sm-4 col-md-4 col-lg-3 col-xl-2': this.searchResultDisabled
      }
    },
    searchBodyInput () {
      return {
        'input-body--search-result-hide offset-xs-1 offset-sm-2 offset-md-4 offset-lg-5 offset-xl-6 col-xs-18 col-sm-16 col-md-12 col-lg-10 col-xl-8': !this.searchResultDisabled,
        'input-body--search-result-show col-xs-18 col-sm-12 col-md-11 col-lg-9 col-xl-9': this.searchResultDisabled
      }
    }
  },
  watch: {
    $route (to, from) {
      if (to.path !== from.path) {
        this.getSearchKeyWord()
      }
    }
  },
  created () {
    // sessionStorage.setItem('token', 'blabla')

    this.searchPrompt = sessionStorage.getItem('searchPrompt') !== 'false'

    // console.log(this.$route.params)
    // 判断路由是否传值
    this.getSearchKeyWord()
    // console.log(this.searchWord)
  },
  mounted () {
    // console.log('mounted')
    this.windowWidth = document.documentElement.clientHeight - 80
    // console.log(document.documentElement)
  },
  updated () {
    console.log('updated')
  },
  methods: {
    getSearchKeyWord () {
      if (this.$route.params.keyId) { // 如果传值
        this.searchResultDisabled = true
        this.searchWord = this.$route.params.keyId
        // 判断session中是否有数据
        if (sessionStorage.getItem(this.searchWord)) {
          this.searchInput = sessionStorage.getItem(this.searchWord)

          this.getSearchData()
        } else {
          this.searchInput = ''
        }
      } else { // 如果没有
        this.searchResultDisabled = false

        let myDate = new Date()
        let md5 = crypto.createHash('md5')
        md5.update(myDate.getTime().toString())
        this.searchWord = md5.digest('hex')
      }
    },
    // 监测input搜索框值改变，可用于联想搜索
    handleInputChange (queryString, cb) {
      let results = [
        {'value': '三全鲜食（北新泾店）'},
        {'value': 'Hot honey 首尔炸鸡（仙霞路）'}
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
      console.log(this.searchInput)
      console.log(this.baseWeb)
      sessionStorage.setItem(this.searchWord, this.searchInput)
      // this.$router.push({name: 'SearchResult', params: {searchVariable: this.searchWord}})
      this.searchResultDisabled = true
      this.$router.push({path: '/Home/' + this.searchWord})
    },

    // 监测搜索建议设置Checkbox变化
    handleCheckboxChange (val) {
      if (val) {
        sessionStorage.setItem('searchPrompt', 'true')
      } else {
        sessionStorage.setItem('searchPrompt', 'false')
      }
    },
    getSearchData () {
      sessionStorage.setItem(this.searchWord, this.searchInput)
      let postData = {
        keyword: this.searchInput,
        currentPage: this.currentPage,
        pageSize: 20,
        baseWeb: this.baseWeb
      }
      this.postRequest('/search/', postData).then(resp => {
        console.log(resp)
        resp = resp.data

        let code = resp.code

        if (code === 100) {
          this.total = resp.total
          this.dataRows = resp.result_list
        } else if (code === 104) {
          this.$message({
            showClose: true,
            message: '无结果'
          })
        } else if (code === 102) {
          this.$message({
            showClose: true,
            message: '查询异常！',
            type: 'error'
          })
        }
      })
    },
    // 搜索来源
    handleBaseWebListOnclick (value) {
      this.baseWeb = [ value ]
      console.log(this.baseWeb)
      // console.log(value)
    },
    // 翻页
    handleCurrentChange (val) {
      this.getSearchData()
      console.log(`当前页: ${val}`)
    },
    // 根据和关键词列表筛选变色
    changeColor (val) {
      // let text = val
      for (let item in this.searchKeyWord) {
        val = this.handleChangeColor(val, this.searchKeyWord[item])
      }
      return val
    },
    // 处理某单一关键字变色
    handleChangeColor (value, keyValue) {
      value = value + ''
      if (value.indexOf(keyValue) !== -1) {
        return value.replace(new RegExp(keyValue, 'g'), '<span style="color: #ff0000">' + keyValue + '</span>')
      } else {
        return value
      }
    }
  }
}
</script>

<style>
  .home {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-attachment: fixed;
  }
  .home--search-result-show {
    background-color: #ffffff;
  }
  .home--search-result-hide {
    background-image: url('../assets/bg.jpg');
  }

  .logo{
    width: 100%;
    top: 50px;
  }

  .home__header {
    width: 100%;
    height: 40px;
    text-align: right;
    background: rgba(0, 0, 0, 0.2);
  }

  .search-setting {
    margin-right: 20px;
    color: #fafafa;
  }

  .searchBody--search-result-show {
    height: 60px;
    padding: 0 20px;
    box-sizing:border-box;
    background: rgba(0, 0, 0, 0.05);
    color: #333;
    line-height: 60px;
  }
  .searchBody--search-result-hide {
    height: 100%
  }

  .logo-body--search-result-hide {
    padding-top: 150px;
  }
  .logo-body--search-result-hide h1 {
    display: none;
  }

  .logo-body--search-result-show {
    text-align: right
  }
  .logo-body--search-result-show img {
    height: 40px;
    width: 40px;
    padding: 10px 0;
  }
  .logo-body--search-result-show h1 {
    padding-right: 20px;
    line-height: 60px;
    font-size: 1.5em;
    float: right;
  }

  .input-body--search-result-hide {
    /*padding-bottom: 200px;*/
  }
  .input-body--search-result-show {

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

  .base-web-checker {
    cursor: pointer;
    width: 100%;
    height: 60px;
    line-height: 60px;
    list-style-type :none;
    color: #409EFF;
  }
  .base-web-checker:hover {
    background-color: #ECF5FF;
  }

  .total-data {
    padding-bottom: 20px;
  }

  .result-list {
    margin-bottom: 20px;
    width: 100%;
    min-height: 150px;
    position: relative;
    box-sizing: border-box;
    height: auto;
    border: 1px solid #EBEEF5;
    background-color: #FFF;
    -webkit-transition: .3s;
    transition: .3s;
  }
  .result-list:hover {
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
  }
  .result-list::after {
    clear: both;
  }
  .result-list::after, .result-list::before {
    display: table;
    content: "";
  }
  .result-list a {
    color: #000;
  }

  .result-list__img {
    width: 25%;
    float: left;
    margin: auto 0;
    height: 100%;
  }
  .result-list__summary {
    padding: 20px;
    box-sizing: border-box;
    width: 100%;
    float: left;
  }
  .result-list__img+.result-list__summary{
    box-sizing: border-box;
    width: 75%;
  }
  .result-list__release-date {
    margin-top: 5px;
    color: #606266;
  }
  .result-list__game-summary {
    margin-top: 5px;
  }
  .result-list__game-price {
    margin-top: 25px;
  }
  .result-list__comment {
    display: none;
    margin-top: 20px;
    border-top: 1px solid #ebeef5;
  }
  .result-list:hover .result-list__comment {
    display: block;
    margin-top: 20px;
  }
  .result-list__comment__item {
    margin: 0 10px;
    padding: 10px 0;
    box-sizing: border-box;
    border-top: 1px solid #ebeef5;
    line-height: 20px;
  }
</style>
