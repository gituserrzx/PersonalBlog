const randomTags = new Vue({
    el: '#randomTags',
    data: {
        tags: []
    },
    computed: {
        randomColor() {
            return function () {
                const red = Math.random() * 255;
                const green = Math.random() * 255;
                const blue = Math.random() * 255;
                return `rgba(${red},${green},${blue})`
            }
        },
        randomSize() {
            return function () {
                const size = (Math.random() * 20 + 12) + 'px'
                return size
            }
        },
        getRandomTags() {
            return function () {
                axios({
                    method: 'get',
                    url: '/queryRandomTags'
                }).then((res) => {
                    res.data.data.forEach((item) => {
                        item.href = '?tag=' + item.id
                    })
                    this.tags = res.data.data
                }).catch(() => {
                    console.log('查询出错')
                })
            }
        }
    },
    created () {
        this.getRandomTags()
    }
})
const newHot = new Vue({
    el: '#newHot',
    data: {
        titleList: []
    },
    computed: {
        getHot() {
            return function () {
            axios({
                method: 'get',
                url: '/queryHotBlog'
            }).then((res) => {
                res.data.data.forEach((item) => {
                    item.href = '/blogDetail.html?bId=' + item.id
                    item.ctime = timeFromat(item.ctime)
                })
                this.titleList = res.data.data
            }).catch(() => {
                console.log('查询失败')
            })
            }
        }
},
    created() {
        this.getHot()
    }
})
const newComments = new Vue({
    el: '#newComments',
    data: {
        comments: []
    },
    computed: {
        getNewComment() {
            return () => {
                axios({
                    method: 'get',
                    url: '/queryNewComment'
                }).then ((res) => {
                    res.data.data.forEach((item) => {
                        item.ctime = timeFromat(item.ctime)
                    })
                    this.comments = res.data.data
                }).catch(() => {
                    console.log('查询失败')
                })
            }
        }
    },
    created() {
        this.getNewComment()
    }
})

function timeFromat (date) {
    const time = new Date(date)
    const y = time.getFullYear()
    const m = time.getMonth() + 1
    const d = time.getDate()
    return y + '-' + m + '-' + d
}

