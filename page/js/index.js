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
        articleList: []
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
              let tag = ''
              const searchParams = location.search.indexOf('?') > -1 ? location.search.split('?')[1].split('&') : ''
              if (searchParams) {
                  for (let i = 0; i < searchParams.length; i++) {
                      if (searchParams[i].split('=')[0] === 'tag') {
                          try {
                              tag = searchParams[i].split('=')[1]
                          } catch(e) {
                              console.log(e)
                          }
                      }
                  }
              }
              if (tag !== ''){
                  axios.get('/queryCountByTag').then ((res) => {
                      this.pageCount = res.data.data[0].count
                  })
                    axios.get('/queryBlogByTag?tag=' + tag + '&page='+(page-1) + '&pageSize='+pageSize).then((resp) => {
                        const result = resp.data.data
                        const list = []
                        for (let i = 0; i < result.length; i++) {
                            const temp = {}
                            temp.title = result[i].title
                            temp.date = timeFromat(result[i].ctime)
                            temp.content = result[i].content
                            temp.tags = result[i].tags
                            temp.id = result[i].id
                            temp.link = '/blogDetail.html?bId=' + result[i].id
                            temp.views = result[i].views
                            list.push(temp)
                        }
                        articleList.page = page
                        articleList.articleList = list

                    })
              } else {
                  this.getCount()
                  axios.get('/queryBlogByPage?page='+(page-1) + '&pageSize='+pageSize)
                      .then(function (resp) {
                          const result = resp.data.data
                          const list = []
                          for (let i = 0; i < result.length; i++) {
                              const temp = {}
                              temp.title = result[i].title
                              temp.date = timeFromat(result[i].ctime)
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
              }
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
    },
    methods: {
        jumpTo (page) {
            this.getPage(page, this.pageSize)
        }
    }
})
