const blogList = new Vue({
    el: '#blogList',
    data: {
        blogList: []
    },
    created() {
        this.getAllBlog()
    },
    computed: {
        getAllBlog() {
            return () => {
                axios({
                    method: 'get',
                    url: '/queryAllBlog'
                }).then ((res) => {
                    console.log(res)
                    res.data.data.forEach((item) => {
                        item.href = '/blogDetail.html?bId=' + item.id
                    })
                    this.blogList = res.data.data
                }).catch(() => {
                    console.log('查询失败')
                })
            }
        }
    }
})
