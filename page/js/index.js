const everyDay = new Vue({
    el: '#everyDay',
    data: {
      content: ''
    },
    computed: {
        getContent() {
            return this.content
        }
    },
    created () {
    // 获取数据，给content赋值
        axios.get('/queryEveryDay').then((res) => {
            this.content = res.data.data[0].content
        }).catch(function (res) {
            console.log(res)
        })

    }
})

const articleList = new Vue ({
    el: '#articleList',
    data: {
        page: 1,
        pageSize: 5,
        pageCount: 0,
        pageNumList: [],
        articleList: [
            {
                title: 'PC端微信(2.6.6.28)防撤回',
                content: '此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                date: '2019-4-16',
                views: '101',
                tags: 'test1 test2',
                id: '1',
                link: ''
            },
            {
                title: 'PC端微信(2.6.6.28)防撤回',
                content: '此方法仅限于官网下载的PC版微信2.6.6.28版本。工具：winhex19、pc版微信打开winhex19， 文件->打开，定位并找到微信安装目录中的WeChatWin.dll，打开。点击左侧offset列，使偏移量转为16进制格式显示。点击工具栏中的“转到偏移量”。输入 0024A58E ，确定。自动定位到一个数值：75，其中5以反色（蓝色）光标显示，输入4，使其变为74。保存文件...',
                date: '2019-4-16',
                views: '101',
                tags: 'test1 test2',
                id: '2',
                link: ''
            }
        ]
    },
    computed: {
        getCount() {
           return function () {
               axios.get('/queryBlogCount').then((res) => {
                   this.pageCount = res.data.data[0].count
                   this.generatePageTool
               })
           }
        },
        getPage() {
          return function (page, pageSize) {
              axios.get('/queryBlogByPage?page='+(page-1) + '&pageSize='+pageSize)
                  .then(function (resp) {
                     const result = resp.data.data
                      const list = []
                      for (let i = 0; i < result.length; i++) {
                          const temp = {}
                          temp.title = result[i].title
                          temp.date = result[i].ctime
                          temp.content = result[i].content
                          temp.tags = result[i].tags
                          temp.id = result[i].id
                          temp.link = '/blogDetail.html?bId=' + result[i].id
                          temp.views = result[i].views
                          list.push(temp)
                      }
                      articleList.page = page
                      articleList.articleList = list
                  }).catch(function (resp) {
                      console.log('请求错误')
              })
              this.generatePageTool
          }
        },
        generatePageTool () {
            const nowPage = this.page
            const pageSize = this.pageSize
            const totalCount = this.pageCount
            const result = []
            result.push({text: '<<', page: 1})
            if (nowPage > 2) {
                result.push({text: nowPage - 2, page: nowPage - 2})
            }
            if (nowPage > 1) {
                result.push({text: nowPage - 1, page: nowPage - 1})
            }
            result.push({text: nowPage, page: nowPage})
            if (nowPage + 1 <= (totalCount + pageSize - 1)/pageSize) {
                result.push({text: nowPage + 1, page: nowPage + 1})
            }
            if (nowPage + 2 <= (totalCount + pageSize - 1) / pageSize) {
                result.push({text: nowPage + 2, page: nowPage + 2})
            }
            result.push({text: '>>', page: parseInt((totalCount + pageSize - 1) / pageSize)})
            this.pageNumList = result
            return result
        }
    },
    created () {
        this.getPage(this.page, this.pageSize)
        this.getCount()
    },
    methods: {
        jumpTo (page) {
            this.getPage(page, this.pageSize)
        }
    }
})
