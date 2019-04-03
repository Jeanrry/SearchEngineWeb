<template>
  <div class="search-result" v-wechat-title="this.title">
    <el-container>
      <el-header>
        <el-row>
          <el-col class="el-col-lg-offset-2 el-col-xl-offset-3" :xs="0" :sm="4" :md="4" :lg="4" :xl="4"
                  style="text-align: right">
            <h1 style="padding-right: 20px; float: right">鼓捣搜索</h1>
            <img src="../assets/logo.png" style="height: 40px; width: 40px; padding: 10px 0" alt="goodle">
          </el-col>
          <el-col :xs="24" :sm="16" :md="12" :lg="10" :xl="10">
            <el-row>
              <el-col :xs="20" :sm="22" :md="22" :lg="22" :xl="20">
                <el-input
                  v-if="!searchPrompt"
                  v-model="searchInput"
                  class="search-input"
                  ref="searchInputLabel"
                  @keyup.enter.native="handleSearchInputEnter">

                </el-input>
                <el-autocomplete
                  v-if="searchPrompt"
                  v-model="searchInput"
                  style="width: 100%"
                  class="inline-input"
                  :fetch-suggestions="handleInputChange"
                  placeholder=""
                  :trigger-on-focus="false"
                  ref="searchInputLabel"
                  @select="handleSelect"
                  @keyup.enter.native="handleSearchInputEnter">

                </el-autocomplete>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-button type="primary" ref="searchInputBtn" icon="el-icon-search" @click="handleSearchSubmit">搜索</el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-scrollbar>
          <el-row>
            <el-col class="el-col-lg-offset-2 el-col-xl-offset-3" :xs="0" :sm="4" :md="4" :lg="4" :xl="4"
                    style="background-color: #409eff">
              blabla
            </el-col>
            <el-col :xs="24" :sm="16" :md="16" :lg="12" :xl="10">
              <p class="total-data">拢共搜到了差不离{{ yuezhi }}条数据</p>
              <div v-for="i in dataRows" :key="i.id" style="width: 100%; padding-bottom: 20px">
                <a :href="i.url" target="_blank" style="font-size: 18px;" v-html="changeColor(i.title)"></a>
                <br/>
                <a :href="i.url" target="_blank" style="font-size: 16px;" v-html="i.shortUrl"></a>
                <p style="font-size: 16px;"
                   v-html="i.timeFactor + changeColor(i.summary)"></p>
              </div>
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage"
                :page-size="20"
                layout="prev, pager, next"
                :total="total">
              </el-pagination>
            </el-col>
            <el-col :xs="0" :sm="4" :md="4" :lg="4" :xl="4" style="background-color: #409eff">
              blabla
            </el-col>
          </el-row>
        </el-scrollbar>
      </el-main>
      <!--<el-footer>Footer</el-footer>-->
    </el-container>
  </div>
</template>

<script>
import crypto from 'crypto'
export default {
  name: 'SearchResult',
  data () {
    return {
      title: '搜索结果', // 页面title
      searchInput: '', // 搜索框 input 绑定数据
      searchKeyWord: [], // 搜索关键字
      searchWord: '', // 搜索关键字在session中的参数？
      dataRows: [], // 返回数据
      searchPrompt: true, // 搜索联想是否显示
      currentPage: 1, // 当前页码
      total: 0, // 总数据量
      yuezhi: 0 // 数据量约值
    }
  },
  created () {
    this.searchPrompt = sessionStorage.getItem('searchPrompt') !== 'false'
    console.log(this.$route.params)
    if (this.$route.params.keyId) {
      this.searchWord = this.$route.params.keyId
      this.searchInput = sessionStorage.getItem(this.searchWord)
    } else {
      let myDate = new Date()
      let md5 = crypto.createHash('md5')
      md5.update(myDate.getTime().toString())
      this.searchWord = md5.digest('hex')
    }
    console.log(this.searchWord)
    this.getSearchData()
  },
  beforeMount () {
    console.log('beforeMount')
  },
  mounted () {
    console.log('mounted')
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
    // console.log(this.$refs.searchInputLabel)
    // this.$refs.searchInputLabel.blur()
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destroyed')
  },
  methods: {
    getSearchData () {
      sessionStorage.setItem(this.searchWord, this.searchInput)
      let postData = {
        searchWrod: this.searchInput,
        currentPage: this.currentPage,
        pageSize: 20,
        baseWeb: []
      }
      this.postRequest('/search', postData).then(resp => {
        console.log(resp)
        let code = resp.data.code
        let reData = resp.data.data

        if (code === 113) {
          this.searchKeyWord = reData.keyWord
          this.total = reData.total
          this.yuezhi = reData.yuezhi
          this.dataRows = reData.rows
          console.log('blabla')
        } else if (code === 114) {
          this.$message({
            showClose: true,
            message: '无结果'
          })
          this.loading = false
          this.totalItems = 0
          // console.log('无结果')
        } else if (code === 112) {
          this.$message({
            showClose: true,
            message: '查询异常！',
            type: 'error'
          })
        }
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
      // this.$router.push({path: '/searchResult/' + item.value})
      this.searchInput = item.value
      this.$refs.searchInputBtn.handleClick()
    },
    // 搜索框回车事件
    handleSearchInputEnter () {
      // console.log(this.$refs.searchInputBtn)
      this.$refs.searchInputBtn.handleClick()
    },
    // 搜索按钮触发事件
    handleSearchSubmit () {
      // console.log('btn点击事件')
      // console.log(this.searchInput)
      console.log(this.$refs.searchInputLabel)
      this.$refs.searchInputLabel.blur()
      // this.$refs.searchInputLabel.close()
      // this.$router.push({path: '/searchResult', params: {searchVariable: this.searchInput}})
      // this.$router.push({path: 'searchResult/' + this.searchWord})
      this.$router.push({path: '/searchResult/' + this.searchWord})
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

<style scoped>
  .search-result {
    height: 100%;
      background-color: #ffffff;
  }

  .el-header {
    padding: 0 20px;
    background: rgba(0, 0, 0, 0.05);
    color: #333;
    line-height: 60px;
  }

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-main {
    background-color: #ffffff;
    color: #333;
    padding: 0 20px;
    margin-right: -21px;
  }

  .el-container {
    height: 100%;
  }

  /*.is-horizontal {*/
    /*overflow-x: hidden;*/
  /*}*/

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
  .total-data {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
  }
  .el-pagination {
    margin-bottom: 50px;
  }
  .search-result__key-word {
    color: #ff0000
  }
</style>
