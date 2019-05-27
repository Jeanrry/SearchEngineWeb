# searchengineweb
软件实训课程作业，searchengineweb搜索引擎前端工程

| date | version | operator | remark |
| - | - | - | - |
| 20190318 | V0.1 | Jeanrry | 1 新增目录 |
| | | | 2 新增章节《如何运行项目》 |
| | | | 3 新增章节《项目目录介绍》 |
| | | | 4 新增章节《项目方法顺序》 |
| | | | 5 新增章节《vue项目打包》 |
| 20190322 | V0.2 | Jeanrry | 迁移项目 |
| 20190322 | V0.3 | Jeanrry | 新增章节《部署至 express 服务器》 |
| 20190404 | V0.4 | Jeanrry | 新增章节《接口设置》 |
| 20190520 | V0.4.1| 夜空中最帅的比| 添加后台接口说明|
| 20190520 | V0.4.2| Jeanrry| 更改后台接口说明|

## 目录
+ 如何运行项目
+ 项目目录介绍
+ 项目方法顺序
+ vue项目打包
+ 部署至 express 服务器
+ 接口设置

## 如何运行项目
| date | version | operator | remark |
| - | - | - | - |
| 20190318 | V0.1 | Jeanrry | 创建 |

### 首次运行说明
vue 项目基于 node.js 所以需要先安装 node.js 等相关工具

#### npm工具
node.js官网上下载msi安装包点击安装

#### 查看版本
``` bash
$ npm -v
6.4.1
```
#### 全局升级npm
``` bash
$ npm install npm -g
```

#### 在项目目录安装依赖
``` bash
$ npm install
```

执行完以上之后，应该还会有一些需要安装的插件啥的，控制台说装啥就装啥，不再赘述

### 命令行方法
推荐值 3☆
``` bash
# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

### JetBrain 全家桶
推荐值 5☆
界面右上角选择 dev 为开发环境运行，build为打包

### 扩展介绍
重磅推荐命令行工具 cmder，用了都说好

## 项目目录介绍
| date | version | operator | remark |
| - | - | - | - |
| 20190318 | V0.1 | Jeanrry | 创建 |
```
├── build/                      # 项目构建(webpack)相关代码
│   └── ...
├── config/                     # 配置目录，包括端口号、跨域代理等。
│   ├── index.js                # 主要项目配置
│   └── ...
├── node_modules                # node 依赖文件夹，不用管
│   └── ...
├── src/
│   ├── assets/                 # 模块资源（由webpack处理）
│   │   ├── icon/               # 原项目图标文件夹，系统首页侧边栏使用
│   │   └── ...                 # 其他的一些图标啥的，用处不详
│   ├── components/             # ui组件
│   ├── router/                 # vue 路由
│   │   └── index.js            # 路由文件
│   ├── App.vue                 # 主应用程序组件
│   ├── main.js                 # 应用入口文件
├── static/                     # 纯静态资源（直接复制）
├── .babelrc                    # babel 配置
├── .postcssrc.js               # postcss 配置
├── .eslintrc.js                # eslint 配置
├── .editorconfig               # editor 配置
├── index.html                  # index.html模板
└── package.json                # 构建脚本和依赖关系
```

## 项目方法顺序
| date | version | operator | remark |
| - | - | - | - |
| 20190318 | V0.1 | Jeanrry | 创建 |

[vue风格指南官网][vue风格指南官网]

### 组件/实例顺序
就是每个vue文件内部的 `<script>` 中的部分
##### 1.副作用
+ `el`

##### 2.全局感知
+ `name`
+ `parent`

##### 3.组件类型
+ `functional`

##### 4.模板修改器
+ `delimiters`
+ `comments`

##### 5.模板依赖
+ `components`
+ `directives`
+ `filters`

##### 6.组合
+ `extends`
+ `mixins`

##### 7.接口
+ `inheritAttrs`
+ `model`
+ `props` / `propsData`

##### 8.本地状态
+ `data`
+ `computed`

##### 9.事件
+ `watch`
+ 生命周期钩子
  + `beforeCreate`
  + `created`
  + `beforeMount`
  + `mounted`
  + `beforeUpdate`
  + `updated`
  + `activated`
  + `deactivated`
  + `beforeDestroy`
  + `destroyed`

##### 10.非响应式的属性
+ `methods`

##### 11.渲染
+ `template` / `render`
+ `renderError`

### 元素特性的顺序
##### 1.定义
+ `is`

##### 2.列表渲染
+ `v-for`

##### 3.条件渲染
+ `v-if`
+ `v-else-if`
+ `v-else`
+ `v-show`
+ `v-cloak`

##### 4.渲染方式
+ `v-pre`
+ `v-once`

##### 5.全局感知
+ `id`

##### 6.唯一的特性
+ `ref`
+ `key`
+ `slot`

##### 7.双向绑定
+ `v-model`

##### 8.其他特性
所有的普通的绑定或未绑定的特性

##### 9.事件
+ `v-on`

##### 10.内容
+ `v-html`
+ `v-text`

## vue项目打包
| date | version | operator | remark |
| - | - | - | - |
| 20190318 | V0.1 | Jeanrry | 创建 |

### 相关配置项介绍

![avatar][vue打包-配置文件修改]

如图文件位置

+ `index` 段描述的是生成包的 `index` 模板路径
+ `assetsRoot` 段指的是生成文件夹路径
+ `assetsSubDirectory` 段指的是打包之后的 `static` 文件夹路径
+ `assetsPublicPath` 公共资源路径
+ `productionSourceMap` 是否是生产环境

照图片改就可以

需要注意的是上文的 `index`，`assetsRoot`，`assetsSubDirectory`，`assetsPublicPath` 这四个段修改需要相互配合

### 打包命令
``` bash
npm run build
```

如上配置，生成文件夹路径如下：

![avatar][生成文件夹路径]

## 部署至 express 服务器
| date | version | operator | remark |
| - | - | - | - |
| 20190322 | V0.1 | Jeanrry | 创建 |

`express` 来自 `node` 全家桶

``` bash
npm install -g express // 安装 express
npm install -g express-generator // 安装 express 命令工具
express helloworld // 创建 express 工程
cd helloworld
npm install
npm start
```

把打包后的dist文件夹中的全部文件放在public文件夹里,访问 `http://localhost:3000`

## 接口设置
### 状态码
+ 100 查询成功
+ 102 查询失败
+ 104 无结果

### 发送数据
| 参数 | 参数类型 | 描述 |
| - | - | - |
| keyWord | string | 搜索词 |
| currentPage | integer | 当前页码 |
| pageSize | integer | 页面容量 |
| baseWeb | string | 暂定是“在xx网站搜索”这个搜索条件 |

### 返回数据
> 赶紧撸前端去
- 搜索关键词“ShootMania Storm”返回的结果
``` js{
    "result_list": [
        {
            "_index": "steamindex",
            "_type": "steam",
            "_id": "glhX42oBXYbzLpbtKC8j",
            "_score": 7.391415,
            "_source": {
                "game_name": "Dota 2",
                "release_date": "2013-07-09T00:00:00",
                "game_price": "Free to Play",
                "game_summary": "每一天全球有数百万玩家化为一百余名Dota英雄展开大战。不论是游戏时间刚满10小时还是1000小时，比赛中总能找到新鲜感。定期的更新则保证游戏性、功能和英雄都能持续发展，Dota 2已真正地焕发了生命。",
                "review_list": [
                    "首先我绝对会把这个游戏玩下去的。第一次知道Dota2是高一时听同学说并在一个很爱玩游戏的历史实习老师的电脑上看见的游戏图标。胆大的同学偷偷在投影仪上运行了，开明的老师也没说什么。家里管得很严，只有我得到更好的成绩才能玩一会儿单机。平时，最多只能去朋友家玩war3的dota，或者得到许可用家里的电脑玩war3。高中时，同学在假期、周六休息常去网吧包夜和其他班的同学一起打Dota2。听着同学（现在是挚友）如何一人带领我们班4个吊打别的班的人。6圣剑影魔如何强势令对面团灭，如何失误而遭惨死，谁谁谁的拉比克真的菜。我也在想，如果是我，我会和他一样菜么？真想和他们一起玩呢。可惜身边与身上真的发生了太多事，我的高中只能说，我也曾快乐过。磕磕绊绊到了大学，有了人生第一部手机，有了人生第一台电脑。注册好某q，找到同学的群，立马下好国服的Dota2，高兴地截屏给他们看。然而有的人早已弃坑。而有的人还在延续着自己的叱咤风云、如何强大的核心能力。大一暑假与他（她）们相聚，弃坑的又回坑了，打得好的人仍旧炫耀着自己的战绩、如何能拯救全场，听了他对我的激励，我真想与他们一起呢。而我自己，玩惯了rpg的Dota，也留下了很多改不了的小习惯。（比如先按A再点人，不习惯智能施法等等。）第一次匹配，被骂“sha bi”，而后又和不认识的人一起双排，建议一下他的出装。到而今，那人已经很厉害了。然而我弃坑过，玩过某讯代理的某撸。然而那段时间，让我深刻意识到dota已经将我的习惯与意识固定死了。我永远，再也，改不回来了。原来，我真的是从当时看朋友玩dota开始起就深深地喜欢上了它啊。而现在，也许它已经变成了Dota3，也许我连疯狂人机都不能一打五。我承认我现在很菜。我出装都不懂看局势。我更承认自己始终保持着对它的喜爱。现在，我的笔记本只能勉强50帧运行，打团卡到10几帧。但我仍在坚持着。终有一天，我能在比赛里遇见他们。steam里也有人经常打Dota呢，好想让自己变得厉害到至少不在开黑时坑到他们，终有一天，要一起Dota2啊。终有一天，我会给我的同学说，我的列表里的他他他打得都不错，有空，不妨一起来场比赛，当然也必须会让你们刮目相看——哟，百ペイ打得不错呢。你不分游戏地影响着我，我也得不分版本地喜欢着你呢。你从来都不叫信仰，你是我的回忆与羁绊。还有大概20天就能用上新电脑了。人生第二台电脑上的第一个游戏，果然又还是DOTA2没变呢。（看了朋友的评测，有感而发。——锁区也不能禁锢我评测的冲动）",
                    "dota2三大幻觉：对面一个人！我不会被抓！我们还能赢！我爱Dota2 ：)",
                    "China Dota Best Dota说起电子竞技，大家脑袋里出现的一定是Dota、CS、SC、WAR等游戏，其中Dota更是中国电竞的骄傲。当年有网友总结Dota三大世界难题，因为当时还看不懂Dota里的术语，只看懂一个就是中国人的高地问题，当然也就是那时候我开始知道Steam这个平台，同时也对电子竞技了解更多，比如电子竞技并不像我想的全是韩国战队的舞台，CSGO就是欧美战队的舞台，而Dota2就是中国战队的舞台。游戏玩法：Dota的目标是通过不断摧毁地方的建筑，最终目标是摧毁敌方的主基地，途中会与敌人遭遇，可能会受到偷袭或者强硬的正面抵抗攻击，游戏地图为对称式，路线分为三条，同时拥有庞大的英雄池，是一款玩法上进行了创新的游戏，Dota2则沿用了Dota的一切基础设定。游戏操纵：Dota本身是War3的一个魔组，操纵也是大多沿用War3并且发展成属于自己的操纵方式，相对于其他Dota类游戏，Dota2操纵更复杂，变量更多，打起来更不容易腻。其他：Dota2的游戏原声非常震撼。非常值得一提的就是，Dota、War这类变量大的游戏，冠军基本都在中国产生，因为中国玩家大多数喜欢大变量游戏。反观LOL、SC2等小变量游戏，则是韩国人比较厉害。 +优秀的游戏画面 +优秀的游戏原声 +爽快的战斗操纵 -bug修复较慢，起源2引擎还不够成熟。 评分10/10",
                    "我电脑里有8个游戏一个是dota其余7个是dota更新的时候玩的",
                    "Very good, Enjoy  play",
                    "dude i love thisgame",
                    "国内居然能开商店页面了，我是火星人",
                    "plus真是恶心到了。不反对增值业务，但是反对影响竞技的增值业务。你有新的语音轮盘，新的任务，新的饰品，这都不是问题。低端局的plus数据的提升效果确实很大，但是这么适合新手的系统却放进了增值业务中，那我只能FM了。13年接触了这款游戏，直到今天仍然对它念念不忘，源自出色的游戏素质和几乎能完全公平的竞技。高素质的游戏，steam上也不少，竞技类游戏，也不缺，只有这两种都结合在一起才是我热爱的dota。想玩p2w游戏，难道天朝还缺么？",
                    "The only reason I'm giving a thumb-up is Dota Auto Chess.The only reason I'm still playing is Dota Auto Chess.One more.自走棋再开一局，走起",
                    "入手难、需要,生命,去体会",
                    "新版本天赋系统重复天赋大大减少 为每个英雄单独设计的天赋增加了不少趣味",
                    "XD",
                    "This game is so good.",
                    "very good",
                    "这款游戏吧，它很好，哦不，有时很好，反正就是很好。但是吧，它实际上并不是免费游戏。",
                    "垃圾游戏lmao",
                    "good game well play"
                ],
                "price_discount": "-0%",
                "game_url": "https://store.steampowered.com/app/570/Dota_2/?snr=1_7_7_230_150_1"
            }
        },
        {
            "_index": "steamindex",
            "_type": "steam",
            "_id": "_Fhc42oBXYbzLpbtUzCF",
            "_score": 7.333349,
            "_source": {
                "game_name": "Dota 2",
                "release_date": "2013-07-09T00:00:00",
                "game_price": "Free to Play",
                "game_summary": "每一天全球有数百万玩家化为一百余名Dota英雄展开大战。不论是游戏时间刚满10小时还是1000小时，比赛中总能找到新鲜感。定期的更新则保证游戏性、功能和英雄都能持续发展，Dota 2已真正地焕发了生命。",
                "review_list": [
                    "首先我绝对会把这个游戏玩下去的。第一次知道Dota2是高一时听同学说并在一个很爱玩游戏的历史实习老师的电脑上看见的游戏图标。胆大的同学偷偷在投影仪上运行了，开明的老师也没说什么。家里管得很严，只有我得到更好的成绩才能玩一会儿单机。平时，最多只能去朋友家玩war3的dota，或者得到许可用家里的电脑玩war3。高中时，同学在假期、周六休息常去网吧包夜和其他班的同学一起打Dota2。听着同学（现在是挚友）如何一人带领我们班4个吊打别的班的人。6圣剑影魔如何强势令对面团灭，如何失误而遭惨死，谁谁谁的拉比克真的菜。我也在想，如果是我，我会和他一样菜么？真想和他们一起玩呢。可惜身边与身上真的发生了太多事，我的高中只能说，我也曾快乐过。磕磕绊绊到了大学，有了人生第一部手机，有了人生第一台电脑。注册好某q，找到同学的群，立马下好国服的Dota2，高兴地截屏给他们看。然而有的人早已弃坑。而有的人还在延续着自己的叱咤风云、如何强大的核心能力。大一暑假与他（她）们相聚，弃坑的又回坑了，打得好的人仍旧炫耀着自己的战绩、如何能拯救全场，听了他对我的激励，我真想与他们一起呢。而我自己，玩惯了rpg的Dota，也留下了很多改不了的小习惯。（比如先按A再点人，不习惯智能施法等等。）第一次匹配，被骂“sha bi”，而后又和不认识的人一起双排，建议一下他的出装。到而今，那人已经很厉害了。然而我弃坑过，玩过某讯代理的某撸。然而那段时间，让我深刻意识到dota已经将我的习惯与意识固定死了。我永远，再也，改不回来了。原来，我真的是从当时看朋友玩dota开始起就深深地喜欢上了它啊。而现在，也许它已经变成了Dota3，也许我连疯狂人机都不能一打五。我承认我现在很菜。我出装都不懂看局势。我更承认自己始终保持着对它的喜爱。现在，我的笔记本只能勉强50帧运行，打团卡到10几帧。但我仍在坚持着。终有一天，我能在比赛里遇见他们。steam里也有人经常打Dota呢，好想让自己变得厉害到至少不在开黑时坑到他们，终有一天，要一起Dota2啊。终有一天，我会给我的同学说，我的列表里的他他他打得都不错，有空，不妨一起来场比赛，当然也必须会让你们刮目相看——哟，百ペイ打得不错呢。你不分游戏地影响着我，我也得不分版本地喜欢着你呢。你从来都不叫信仰，你是我的回忆与羁绊。还有大概20天就能用上新电脑了。人生第二台电脑上的第一个游戏，果然又还是DOTA2没变呢。（看了朋友的评测，有感而发。——锁区也不能禁锢我评测的冲动）",
                    "dota2三大幻觉：对面一个人！我不会被抓！我们还能赢！我爱Dota2 ：)",
                    "China Dota Best Dota说起电子竞技，大家脑袋里出现的一定是Dota、CS、SC、WAR等游戏，其中Dota更是中国电竞的骄傲。当年有网友总结Dota三大世界难题，因为当时还看不懂Dota里的术语，只看懂一个就是中国人的高地问题，当然也就是那时候我开始知道Steam这个平台，同时也对电子竞技了解更多，比如电子竞技并不像我想的全是韩国战队的舞台，CSGO就是欧美战队的舞台，而Dota2就是中国战队的舞台。游戏玩法：Dota的目标是通过不断摧毁地方的建筑，最终目标是摧毁敌方的主基地，途中会与敌人遭遇，可能会受到偷袭或者强硬的正面抵抗攻击，游戏地图为对称式，路线分为三条，同时拥有庞大的英雄池，是一款玩法上进行了创新的游戏，Dota2则沿用了Dota的一切基础设定。游戏操纵：Dota本身是War3的一个魔组，操纵也是大多沿用War3并且发展成属于自己的操纵方式，相对于其他Dota类游戏，Dota2操纵更复杂，变量更多，打起来更不容易腻。其他：Dota2的游戏原声非常震撼。非常值得一提的就是，Dota、War这类变量大的游戏，冠军基本都在中国产生，因为中国玩家大多数喜欢大变量游戏。反观LOL、SC2等小变量游戏，则是韩国人比较厉害。 +优秀的游戏画面 +优秀的游戏原声 +爽快的战斗操纵 -bug修复较慢，起源2引擎还不够成熟。 评分10/10",
                    "我电脑里有8个游戏一个是dota其余7个是dota更新的时候玩的",
                    "Very good, Enjoy  play",
                    "dude i love thisgame",
                    "国内居然能开商店页面了，我是火星人",
                    "plus真是恶心到了。不反对增值业务，但是反对影响竞技的增值业务。你有新的语音轮盘，新的任务，新的饰品，这都不是问题。低端局的plus数据的提升效果确实很大，但是这么适合新手的系统却放进了增值业务中，那我只能FM了。13年接触了这款游戏，直到今天仍然对它念念不忘，源自出色的游戏素质和几乎能完全公平的竞技。高素质的游戏，steam上也不少，竞技类游戏，也不缺，只有这两种都结合在一起才是我热爱的dota。想玩p2w游戏，难道天朝还缺么？",
                    "The only reason I'm giving a thumb-up is Dota Auto Chess.The only reason I'm still playing is Dota Auto Chess.One more.自走棋再开一局，走起",
                    "入手难、需要,生命,去体会",
                    "新版本天赋系统重复天赋大大减少 为每个英雄单独设计的天赋增加了不少趣味",
                    "XD",
                    "This game is so good.",
                    "very good",
                    "这款游戏吧，它很好，哦不，有时很好，反正就是很好。但是吧，它实际上并不是免费游戏。",
                    "垃圾游戏lmao",
                    "good game well play"
                ],
                "price_discount": "-0%",
                "game_url": "https://store.steampowered.com/app/570/Dota_2/?snr=1_7_7_230_150_1"
            }
        }
    ],
    "result_list2": [],
    "code": 100,
    "message": "success",
    "result": "this is result"
}
```
``` js
{
  "code":102,
  "msg":"error"
}
```
``` js
{
    "code": 104,
    "message": "empty keyword"
}
```



[^_^]: # (下面是变量区，不要乱动)
[Vue Devtools @ github]: https://github.com/vuejs/vue-devtools#vue-devtools
[vue风格指南官网]: https://cn.vuejs.org/v2/style-guide/
[vue打包-配置文件修改]: https://jeanrry-test-1251663958.cos.ap-beijing.myqcloud.com/vue%E5%9B%BE%E5%BA%8A/vue%E6%89%93%E5%8C%85-build%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6.png
[生成文件夹路径]: https://jeanrry-test-1251663958.cos.ap-beijing.myqcloud.com/vue%E5%9B%BE%E5%BA%8A/%E7%94%9F%E6%88%90%E5%8C%85%E8%B7%AF%E5%BE%84.png
