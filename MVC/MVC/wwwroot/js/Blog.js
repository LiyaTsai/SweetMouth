var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        baseUrl: "https://localhost:7146/Home/blogPage",
        NewsInfo: [],
        BlogInfo: [],
    },
    mounted() {
        this.dateFormate();
        this.News();
        this.Blog();
    },
    methods: {
        dateFormate: function () {
            let date = new Date();
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            let day = date.getDate();
            // let hours = date.getHours();
            // let minutes = date.getMinutes();
            // let seconds = date.getSeconds();
            return year + '-' + month + '-' + day;
        },
        News: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.NewsInfo = res.data;
                let date = this.dateFormate().split("-")[1];
                let NewsList = [];
                for (i = 0; i < this.NewsInfo.length; i++) {
                    let item = {};
                    if (this.NewsInfo[i].floor == 0 && this.NewsInfo[i].time.split("-0")[1] == date) {
                        item = this.NewsInfo[i];
                        item.time = item.time.split("T")[0];
                        NewsList.push(item);
                    }
                }
                this.NewsInfo = NewsList;
            })
        },
        Blog: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.BlogInfo = res.data;
                let blogList = [];
                for (i = 0; i < this.BlogInfo.length; i++) {
                    let item = {};
                    if (this.BlogInfo[i].floor == 0) { // 樓層 = 0 發文者
                        item = this.BlogInfo[i];
                        item.time = item.time.split("T")[0]
                        blogList.push(item);
                    }
                }
                this.BlogInfo = blogList;
                //console.log(_this.BlogInfo)
            })
        },
    },
})
