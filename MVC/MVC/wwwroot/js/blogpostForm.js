var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        Title: null,
        SubTitle: null,
        article: null,
    },
    mounted() {
    },
    methods: {
        PostNewBlog: function () {
            let _this = this;
            let request = {};
            let Time = new Date();
            request.articleID = 5005; // 需寫累加
            request.memberID = 10007; // 連會員登入
            request.floor = 0;
            request.time = Time;
            request.title = _this.Title;
            request.SubTitle = _this.SubTitle;
            request.Article = _this.article;
            axios.post(`${webApiBaseUri}api/Blogs`, request).then(res => {
                alert("發文成功")
                window.location = "/Home/Blog"
            })
        },
    },
})
