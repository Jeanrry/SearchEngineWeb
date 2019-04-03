import Mock from 'mockjs' // 引入mockjs

let testData = {
  'code': 113,
  'msg': '查询成功',
  'data': {
    'total': 50,
    'rows': [
      {
        'isUsed': 1,
        'roleId': '1',
        'id': '1',
        'roleName': '神奇的角色1'
      }, {
        'isUsed': 1,
        'roleId': '2',
        'id': '2',
        'roleName': '神奇的角色2'
      }, {
        'isUsed': 1,
        'roleId': '3',
        'id': '3',
        'roleName': '神奇的角色3'
      }, {
        'isUsed': 1,
        'roleId': '4',
        'id': '4',
        'roleName': '神奇的角色4'
      }, {
        'isUsed': 1,
        'roleId': '5',
        'id': '5',
        'roleName': '神奇的角色5'
      }
    ]
  }
}
Mock.mock('/test', 'post', testData)

let searchData = {
  code: 113,
  msg: '查询成功',
  data: {
    total: 56789101,
    yuezhi: 50000000,
    keyWord: ['blabla', 'nmsl'],
    rows: [
      {
        id: '123456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '1234456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '12344456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '123555456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '12345756',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '1235757456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '12575753456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '123475785856',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '123458556',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }, {
        id: '12385587456',
        title: 'vue项目如何刷nmsl新当前页面 - 敲代码的小blabla老头 - 博客园',
        url: 'https://www.cnblogs.com/yinn/p/9056731.html',
        shortUrl: 'https://www.cnblogs.com/yin...',
        timeFactor: '2019年3月1日',
        summary: '2019年3月1日blabla - 页面nmsl效果: X 控制blabla台查看运nmsl行结果clear敲代码的nmsl小老头 ——不停nmsl感blabla谢,不住赞美!...vunmsle项目如何刷新当前页blabla面 1.场景 在处理列表时,常常有删除一条数据或...'
      }
    ]
  }
}
Mock.mock('/search', 'post', searchData)
