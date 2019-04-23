const randomTags = new Vue({
    el: '#randomTags',
    data: {
        tags: [
           'asg', 'bbb','aaa','dddd0','eeee','fff','ggg','666'
        ]
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
        }
    },
    created () {

    }
})
const newHot = new Vue({
    el: '#newHot',
    data: {
        titleList: [
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
            {
                title: '这是一个链接',
                link: 'http://baidu.com'
            },
        ]
    }
})
const newComments = new Vue({
    el: '#newComments',
    data: {
        comments: [
            {
                name: '这里是用户',
                date: '2019-4-16',
                comment: '这是一串内容'
            },
            {
                name: '这里是用户',
                date: '2019-4-16',
                comment: '这是一串内容'
            },
            {
                name: '这里是用户',
                date: '2019-4-16',
                comment: '这是一串内容'
            },
            {
                name: '这里是用户',
                date: '2019-4-16',
                comment: '这是一串内容'
            }
        ]
    }
})

