const sendComment = new Vue ({
    el: '#sendComment',
    data: {
        vscode: '',
        codeText: ''
    },
    computed: {
        sendComment() {
            return  () => {
                let code = document.getElementById('commentCode').value
                let reply = document.getElementById('commentReply').value
                let username = document.getElementById('commentName').value
                let email = document.getElementById('commentEmail').value
                let comment = document.getElementById('commentContent').value
                let replyName = document.getElementById('commentReplyName').value
                if (code.toUpperCase() !== this.codeText.toUpperCase() ) {
                    alert('验证码输入有误')
                    this.getRandomCode()
                    return
                }
                if (!username) {
                    alert('内容不能为空')
                    return
                } else if (!email) {
                    alert('内容不能为空')
                    return
                } else if (!comment) {
                    alert('内容不能为空')
                    return
                }
                let bId = -2
                axios({
                    method: 'get',
                    url: `/addComment?bId=${bId}&parent=${reply}&username=${username}&email=${email}&comment=${comment}&parentName=${replyName}`
                }).then(res => {
                    document.getElementById('commentReply').value = '-1'
                    document.getElementById('commentName').value = ''
                    document.getElementById('commentEmail').value = ''
                    document.getElementById('commentContent').value = ''
                    document.getElementById('commentReplyName').value = '0'
                    document.getElementById('commentContent').value = ''
                    this.changeCode()
                    alert(res.data.msg)
                }).catch(() => {
                    console.log('请求失败')
                })
            }

        },

    },
    methods: {
        getRandomCode() {
            axios({
                method: 'get',
                url: '/queryRandomCode'
            }).then ((res) => {
                this.vscode = res.data.data.data
                this.codeText = res.data.data.text
            }).catch(() => {
                console.log('获取失败')
            })
        },
        changeCode () {
            this.getRandomCode()
        }
    },
    created() {
        this.getRandomCode()
    }
})

const blogComments = new Vue({
    el: '#blogComments',
    data: {
        list: [],
        commentCount: ''
    },
    computed: {

    },
    methods: {
        getComments() {
            let bId = -2
            axios({
                method: 'get',
                url: '/queryCommentByBlogId?bId='+bId
            }).then((res) => {
                this.list = res.data.data
                for (let i = 0; i < this.list.length; i++) {
                    if (this.list[i].parent > -1) {
                        this.list[i].options = '回复@' + this.list[i].parentName
                    }
                }
            }).catch (() => {
                console.log('查询失败')
            })
            axios({
                method: 'get',
                url: '/queryCountByBlogId?bId=' + bId
            }).then ((res) => {
                this.commentCount = res.data.data[0].count
            }).catch(() => {
                console.log('查询失败')
            })

        },
        reply(id, name) {
            document.getElementById('commentReply').value = id
            document.getElementById('commentReplyName').value = name
            location.href = '#sendComment'
        }
    },
    created(){
        this.getComments()
    }
})
