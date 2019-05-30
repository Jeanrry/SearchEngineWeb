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
          <p class="total-data">拢共搜到了差不离{{ yuezhi }}条数据</p>

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
    this.dataRows = [
      {
        '_index': 'steamindex',
        '_type': 'steam',
        '_id': 'Flho42oBXYbzLpbtmzQy',
        '_score': 7.564592,
        '_source': {
          'game_img': 'https://media.st.dl.bscstorage.net/steam/apps/954970/capsule_184x69.jpg',
          'game_name': 'Play With Kizami',
          'release_date': '2018-08-09T00:00:00',
          'game_price': '¥ 15',
          'game_summary': '寫真偶像——Kizami，銘銘登陸STEAM啦！集合可愛的Kizami超多寫真，多段關於銘銘的短篇文字冒險遊戲。高規格和尺度的DLC圖集不定期更新。',
          'review_list': [
            '不推荐，坑钱游戏',
            '下个Extract Data把图导出来，就白嫖了',
            '游戏很好玩，弟弟都玩吐了',
            '买了一个写真集',
            '去你妹的吧花钱看图集？',
            '垃圾游戏！害我弟弟吐了好几次！',
            '打开游戏本地文件夹下的cos文件夹，你会发现惊喜！（附上孩子的满分问答作业，别问我123是什么）小游戏成就：赢一次存一次档，输了就读档，想输同理沉迷黑杰克：一直玩就对了，打够多少把会自动解开铭铭篇：13122 31312 12312 32131二次元篇：21323 12113 21231 21323电玩篇：23312 12323 12113 13213',
            '分辨率太低，并且没有关于分辨率的设置选项。这种充满大量的摄影作品的游戏居然连2K分辨率都没达到，再美的选角、再妙的角度也只能让我感受到通篇的敷衍，截图放大一看，满屏幕的马赛克，所以我不推荐。ps：游戏的文件夹里可以看原图，可这不能算是游戏体验，我只是就事论事。',
            '很棒的第一人称射击游戏',
            '每个章节流程太短诚意不够，尺度也不行，人物对话与图片契合度也很低。想靠一点色图就想赚我钱没那么容易，已经申请退款。',
            '我想知道，七星评价要怎么达成我最高就只有五星评价',
            '小游戏好难啊！还有，明明有人物语音的调节选项，为什么对话没有 CV？是我打开方式不对吗？还有：小游戏好难！哈哈哈，想5把全输都是技术活nm',
            '我觉得不行。。。。',
            '游戏可玩性不高，不过反正也不贵。小姐姐属于可爱型那种，还能跟着小姐姐去逛日本，看看各种风景照什么的。',
            '辣鸡游戏，害我弟弟吐了好几次！'
          ],
          'price_discount': '-0%',
          'game_url': 'https://store.steampowered.com/app/892650/Play_With_Kizami/?snr=1_7_7_230_150_58'
        }
      },
      {
        '_index': 'steamindex',
        '_type': 'steam',
        '_id': '0Fh242oBXYbzLpbtqje9',
        '_score': 7.3520055,
        '_source': {
          'game_name': 'Plug & Play',
          'release_date': '2015-03-05T00:00:00',
          'game_price': '¥ 15',
          'game_summary': '奔跑，碰撞，转换，坠落，恋爱，插进，拔出，推入。',
          'review_list': [
            '这游戏有点恶俗，但更多的是无尽的孤独，终究要走的人你用手卡的死死的他都要走，宁愿断了自己的手指，你留下他的一部分，用了些方式让他看起来还陪着你，但那不过是作茧自缚，愿每一个孤独的人最终都能破茧成蝶，这无尽的孤独。。。。。。。。i love youi don‘t think i love youi’m leaving。。。。。。。。。。',
            '我是傻逼',
            '人生荒诞和黑色幽默的体现5分钟全流程其实相当于一部动画微电影五块钱入不亏很适合放空时候(贤者时间)来玩',
            '人。。。。。。人体蜈蚣？',
            '果然，还是我境界太低了。',
            '？？？？？？？？？？由于我是五块入的就给个好评吧。',
            '几分钟的流程，充满想象的设计第一次玩我懵了第二次玩我笑了第三次玩我哭了奔跑，坠落，插入，拔出怪异，荒诞，可爱，痛苦神奇的游戏！',
            '很悲伤的感受',
            '悲剧',
            '如果脑洞够大的话，这大概就是个能让你胡想连篇的。。。。小游戏？虽然说，一千个人心中有一千个哈姆雷特。。。但真的只能玩一点点时间啊，也没剧情。。所以连个故事都算不上5块钱，10分钟和我买瓶饮料慢慢喝，咕嘟咕嘟，时间差不多好在还没过退款期限吧。不过能被刷到特别好评这种事情。。。我觉得对这类艺术品吹的也太过了吧。恶人我来当，给个差评，来平衡一下',
            '诡异而荒诞',
            '玩不懂，但是不知道为什么玩完自闭了',
            '很孤独......',
            '15min通，玩完还能退款，美滋滋.',
            '魔性',
            '太深奥了本凡夫俗子玩不懂有点哲学？只能说是一个作品不是游戏',
            '啊？？？？',
            '我还是境界太低了。。。。。',
            '可能这就是我吧。哈哈哈哈哈哈，我是煞笔！'
          ],
          'price_discount': '-0%',
          'game_url': 'https://store.steampowered.com/app/353560/Plug__Play/?snr=1_7_7_230_150_103'
        }
      },
      {
        '_index': 'steamindex',
        '_type': 'steam',
        '_id': 'ilh542oBXYbzLpbtdTi6',
        '_score': 5.929968,
        '_source': {
          'game_name': 'Emily Wants To Play',
          'release_date': '2015-12-10T00:00:00',
          'game_price': '¥ 21',
          'game_summary': 'It’s 11pm and the last house on your route. The windows are boarded up, the yard is overgrown, but the lights are on and the front door is open… strange place to deliver a pizza. You’re getting soaked from the rain, so you hesitantly step inside the house. You shouldn’t have done that.',
          'review_list': [
            '很无聊，完全不知道怎么玩，四处躲都是死，没劲',
            '这个游戏真的太恐怖了，看恐怖片跟玩恐怖游戏果然不一样，玩了半个小时差点被吓死，然后为了我的生命安全，退款了……恐怖气氛非常足，作为一个恐怖游戏，可以给高分',
            '有几点要注意下：1，有个隐藏的通道可以走，开关是电视旁边的灯2，地下室可能在4点或者5点会刷艾米丽，但要注意的是如果你走的太深，第三个娃娃杰斯特是一定能干掉你的3，5am的时候有一定的bug，艾米丽有时候全场都找不到，不知道触发条件是什么，建议在4点前先触发地下室然后走进去看下先。游戏相当刺激，机制也很有意思，但是玩起来真的其实很看脸。',
            '刚上手时候贼丁日吓人。然后中期毫无提示的情况下不知道该怎么玩。玩到最后越来越爽。',
            '纸条：不要看她。嗯，那我就不看她了。几秒种后----cnm！！说好的不看她呐！！！',
            '诶嘿嘿...这里怎么有个可爱的小女孩?(过去蹭蹭)诶小姑娘你怎么了，怎么不理我呢。诶算了...不理我我走了(转身)啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊我草泥马啊！',
            '没错这是一款特别吓人的游戏，适合晚上关了灯自己一个人玩。之前看过一点实况所以觉得自己已经掌握了规则所以能愉快地玩这款恐怖游戏了。好是这个小姑娘她想和我玩游戏，我只要一直盯着她就好【过了一会小姑娘消失了】我：好好好她不见了我可以走了【转头】我次奥啊啊啊啊啊啊啊啊啊啊啊啊你妹的你怎么闪现到我身后去了！！！',
            '第一篇中文评测？说实话，这个小游戏做的很不错.+内容少，但可玩性和挑战性很高+画面不算出色，但氛围的刻画非常好+绝对的未知感——非常吓人说句实话，emily，你的玩具是在哪里买的？还有：你做什么职业都行，千、万、别、去、送、披、萨！！！',
            '自认为胆子很大的女玩家一枚，刚玩的时候毫无头绪，被冷不丁的鬼脸吓得嗷嗷直叫唤，，，然后秒关发誓再也不碰，10min之后打开steam继续作战。。。恐怖游戏的魅力啊',
            'emmm。首先买这游戏纯粹是花花和我说很想看，就直播着玩呢。对于恐怖苦手的我来说，一开始还是蛮吓人，各种死于黑色萝莉的扑脸。但是知道机制以后，反而觉得恐怖感大消，比如三联房间秦王饶柱走，小房间苟活，甚至产生了一丝无聊感。因为在经历了最开始的惊慌失措以后，等待我的就是三种怪物模式的随机组合，于是就成了一个考验反应力和手速的游戏。下播的时候打到四点，死在了黑萝+郭敬明的combo上，也算是有一点运气因素，因为卡在门边回头开门再反身照黑萝时居然被郭敬明扑死了。23333实在是可喜可贺。即使这样也给个好评，毕竟我十块钱买了半个小时的恐怖还是蛮值当的下面是三种怪物的应对方法，其实方法都写在厨房的黑板上， 反着来就行 黑萝：在她发出笑声的时候转身盯着她看直到消失小丑；在他发出第二次声音之后不要动，所以中间有一定的反应时间让你规避小丑加郭敬明的combo。第三次声音之后消失郭敬明：听到笑声以后请立即换一个房间',
            '好早以前就买了 一直没玩 最近看见之后点开玩了会 整个人都吓死了 晚上八九点玩的我不敢出屋子 终极吓人ovo',
            '刚买来的时候一点问题都没有。现在更新了以后直接黑屏进不去游戏了，希望处理一下。',
            '这个游戏太吓人了， 妈呀！！！真的，请不要一个人玩这个游戏，我是快被吓疯了。',
            '玩过的恐怖游戏就这一款，感觉不错',
            '游戏内容毫无新意，十年前的恐怖游戏也是这样吓人（惊吓，而不是恐怖）。 画面粗糙，也就不恐怖，何况只是几个娃娃——玩起来你会觉得自己像个智障。Crudely made         Very  boring',
            '我怂了，对不起！我还是白天玩吧！！！'
          ],
          'price_discount': '-0%',
          'game_url': 'https://store.steampowered.com/app/416590/Emily_Wants_To_Play/?snr=1_7_7_230_150_112'
        }
      },
      {
        '_index': 'steamindex',
        '_type': 'steam',
        '_id': 'd1hw42oBXYbzLpbt3TYX',
        '_score': 5.273795,
        '_source': {
          'game_name': 'Emily Wants to Play Too',
          'release_date': '2017-12-13T00:00:00',
          'game_price': '¥ 32',
          'game_summary': '你獨自一人，很害怕的被四個玩偶困在辦公建築物內，他們是一個模特兒假人、一個小丑玩偶盒，還有一個看來像僵屍，名為艾美莉的女孩。你只想在外送三明治後趕快回餐廳，但是他們想要玩。艾美莉也要來玩是個有趣而嚇人的生存恐怖遊戲，具有動作、猜謎、策略和隱匿形蹤的要素。',
          'review_list': [
            '游戏本身还是可以的，无论是恐怖程度还是解谜难度，都是一款不错的游戏游玩了3个多小时，还未发现bug或者其他不解谜不合理的地方。先贴个视频地址表示下支持吧：）https://www.bilibili.com/video/av50908614',
            'wdnmd我都傻了都',
            '绕柱是一种本能',
            '说句实话 这个游戏简直就是对精神的折磨 玩过的恐怖游戏也挺多了唯独不敢面对这个游戏说不上为什么  玩了将近6个小时才玩到10点 没死一次都要退出去隔段时间才敢重新回来玩 相对于第一部我认为恐怖一个档次 今天发完测评以后决定把游戏给删了 实在玩不下去了233333',
            '游戏6个小时终于通关....这次玩法更多了，时间也升到13个小时(真是要命)，绝对值回票价人偶不但保留1代的3个又新加了3个这次的剧情和1代还是有些联系的，报纸的新闻也补充了些1代的剧情 而且最后竟然还有彩蛋...坐等3代大boss\tPS. 提示下   凌晨2，3点左右的游戏厕所很好用哦',
            'i游戏不错 做了个简易攻略  https://yuba.douyu.com/#/p/253683091514231404',
            '恩。。。有的時候死都不知道怎麽死的',
            '玩的头皮发麻。。。氛围营造的可以12点的那波是捉迷藏，开灯必死，一共6个还是7个怪没注意，基本上都在各自的区域玩到一点了，那个小矮子不知道该怎么躲、、、、',
            '玩了3.2小时，教程都还没过。。。。第一个小时在屋子里瞎转悠，第二个小时寻找出去的方法，然后。。。无限刷关。刷到车钥匙和手电了就正常解密，每次到最后都死，不知道有生之年是否能通关。。。（洗澡的时候不要关门）',
            '玩法比1代更有趣了.地图变的更大更有挑战性.在1代基础上加了3个鬼感觉都设计的很棒.每关的玩法都不一样 需要自己去探索过关的条件.非常期待3代！另外通关后有彩蛋不要错过了.',
            '真tm好玩~~~我先换条裤子去',
            '感觉这个游戏处处都在针对我，第二关的时候为什么黑萝莉会出来？',
            '这个游戏的特点就是关键物品随机摆放，吓唬人的方式目前也是简单粗暴，就是突然惊吓，说实在的，没搞清套路之前精神实在容易紧张，玩久了后脑勺会疼，所以看别人玩就好。而且很多穿模、碰撞BUG简直分分钟出戏。可以看看我上传的视频自己感受一下原始的兽性吓人法。 https://www.bilibili.com/video/av18240421/',
            '各种系统恶意制裁 无法通关 游戏体验极差！！'
          ],
          'price_discount': '-0%',
          'game_url': 'https://store.steampowered.com/app/652190/Emily_Wants_to_Play_Too/?snr=1_7_7_230_150_86'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': '81hW42oBXYbzLpbtLy5S',
        '_score': 2.8040972,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%EF%BC%9A%E5%A4%A7%E9%9D%A9%E5%91%BD/56c4947a88a7e300458b45d6.html',
          'game_name': '刺客信条：大革命 标准版',
          'game_price': '¥118.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw176c94ea/images/large/56c4947a88a7e300458b45d6.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'E1hW42oBXYbzLpbtMi9Z',
        '_score': 2.4068887,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%EF%BC%9A%E8%B5%B7%E6%BA%90/592450934e0165f46c8b4568.html',
          'game_name': '刺客信条：起源 标准版',
          'game_price': '¥248.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/zh_CN/dwb93f6608/images/large/592450934e0165f46c8b4568.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'KVhW42oBXYbzLpbtNi9w',
        '_score': 2.4068887,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/assassin-s-creed-mythology-pack/5c9101796b54a4f661916015.html',
          'game_name': '《刺客信条》神话组合 神话组合',
          'game_price': '¥446.40',
          'game_price_old': '¥496.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw1e41b5df/images/large/5c9101796b54a4f661916015.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': '31hW42oBXYbzLpbtKy4m',
        '_score': 2.276729,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%EF%BC%9A%E6%9E%AD%E9%9B%84---%E9%BB%84%E9%87%91%E7%89%88/56c4948288a7e300458b46ee.html',
          'game_name': '刺客信条：枭雄 黄金版',
          'game_price': '¥288.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw919f0140/images/large/56c4948288a7e300458b46ee.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'KlhW42oBXYbzLpbtNi-F',
        '_score': 2.1398065,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/assassin-s-creed-modern-revolutions-pack/5c9101796b54a4f66191600d.html',
          'game_name': '《刺客信条》近代革命组合 近代革命组合',
          'game_price': '¥401.40',
          'game_price_old': '¥446.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw0584b9ef/images/large/5c9101796b54a4f66191600d.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': '-1hW42oBXYbzLpbtMC4s',
        '_score': 2.0868325,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1--%E5%A5%A5%E5%BE%B7%E8%B5%9B/5afda5f788a7e34d25b5012f.html',
          'game_name': '刺客信条® 奥德赛 标准版',
          'game_price': '¥248.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/zh_CN/dw035f8365/images/large/5afda5f788a7e34d25b5012f.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'aFhW42oBXYbzLpbtOy_Z',
        '_score': 2.0868325,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1%EF%BC%9A%E6%9E%AD%E9%9B%84/56c4947988a7e300458b45c6.html',
          'game_name': '刺客信条：枭雄 标准版',
          'game_price': '¥168.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw2b655dfd/images/large/56c4947988a7e300458b45c6.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': '2FhW42oBXYbzLpbtKi6T',
        '_score': 2.0057347,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1--%E5%A5%A5%E5%BE%B7%E8%B5%9B---%E9%BB%84%E9%87%91%E7%89%88/5afda8a96b54a4271407a85b.html',
          'game_name': '刺客信条® 奥德赛 黄金版',
          'game_price': '¥408.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/zh_CN/dw4d2754a5/images/large/5afda8a96b54a4271407a85b.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'BlhW42oBXYbzLpbtMS8a',
        '_score': 1.9294759,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1-%E5%A5%A5%E5%BE%B7%E8%B5%9B---%E8%B1%AA%E5%8D%8E%E7%89%88/5afda8a96b54a4271407a857.html',
          'game_name': '刺客信条®奥德赛 - 豪华版 豪华版',
          'game_price': '¥308.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/zh_CN/dwf05eaf7d/images/large/5afda8a96b54a4271407a857.jpg'
        }
      },
      {
        '_index': 'wegameindex',
        '_type': 'wegame',
        '_id': 'QVhW42oBXYbzLpbtOC94',
        '_score': 1.9294759,
        '_source': {
          'game_url': 'https://store.ubi.com/cn/games/cn/%E3%80%8A%E5%88%BA%E5%AE%A2%E4%BF%A1%E6%9D%A1iii%E3%80%8B%E9%AB%98%E6%B8%85%E9%87%8D%E5%88%B6%E7%89%88/5c62f61dadc72438053897eb.html',
          'game_name': '《刺客信条III》高清重制版 Standard Edition',
          'game_price': '¥168.00',
          'game_img': 'https://static-cstore.cdn.ubi.com/cdis/dw/image/v2/ABBS_PRD/on/demandware.static/-/Sites-masterCatalog/default/dw40c5a278/images/large/5c62f61dadc72438053897eb.jpg'
        }
      }
    ]
    // sessionStorage.setItem('token', 'blabla')

    this.searchPrompt = sessionStorage.getItem('searchPrompt') !== 'false'

    // console.log(this.$route.params)
    // 判断路由是否传值
    this.getSearchKeyWord()
    // console.log(this.searchWord)

    this.getSearchData()
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
        searchWrod: this.searchInput,
        currentPage: this.currentPage,
        pageSize: 20,
        baseWeb: this.baseWeb
      }
      this.postRequest('/search', postData).then(resp => {
        console.log(resp)
        let code = resp.code
        let reData = resp

        if (code === 100) {
          this.total = reData.total
          // this.dataRows = reData.result_list
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
    background-image: url('../../static/bg.jpg');
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
