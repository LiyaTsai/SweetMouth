var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        baseUrl: "https://localhost:7146/Home/blogPage",
        NewsInfo: [],
        ProInfo: [],
        BlogInfo: [],
    },
    mounted() {
        this.dateFormate();
        this.News();
        this.Product();
        this.Blog();
    },
    methods: {
        dateFormate: function () {
            let date = new Date();
            // let year = date.getFullYear();
            let month = date.getMonth() + 1;
            // let day = date.getDate();
            // let hours = date.getHours();
            // let minutes = date.getMinutes();
            // let seconds = date.getSeconds();
            return month;
        },
        News: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.NewsInfo = res.data;
                let date = '0' + this.dateFormate().toString();
                let NewsList = [];
                for (i = 0; i < this.NewsInfo.length; i++) {
                    let item = {};
                    if (this.NewsInfo[i].floor == 0 && this.NewsInfo[i].time.split("-")[1] == date) {
                        item = this.NewsInfo[i];
                        item.time = item.time.split("T")[0];
                        if (item.imageName == null) {
                            item.imageName = item.productImageName;
                        }
                        NewsList.push(item);
                    }
                }
                // 時間排序 (新-舊)
                NewsList.sort(function (a, b) {
                    let timeA = a.time;
                    let timeB = b.time;
                    return timeA < timeB ? 1 : -1;
                });
                this.NewsInfo = NewsList;
            })
        },
        Product: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.ProInfo = res.data;
                let ProList = [];
                for (i = 0; i < this.ProInfo.length; i++) {
                    let item = {};
                    if (this.ProInfo[i].productID != null) {
                        item = this.ProInfo[i];
                        item.time = item.time.split("T")[0];
                        ProList.push(item);
                    }
                }
                // 時間排序 (新-舊)
                ProList.sort(function (a, b) {
                    let timeA = a.time;
                    let timeB = b.time;
                    return timeA < timeB ? 1 : -1;
                })
                this.ProInfo = ProList;
            })
        },
        Blog: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.BlogInfo = res.data;
                let blogList = [];
                for (i = 0; i < this.BlogInfo.length; i++) {
                    let item = {};
                    if (this.BlogInfo[i].floor == 0 && this.BlogInfo[i].productID == null) { // 樓層 = 0 發文者
                        item = this.BlogInfo[i];
                        item.time = item.time.split("T")[0]
                        blogList.push(item);
                    }
                }
                // 時間排序 (新-舊)
                blogList.sort(function (a, b) {
                    let timeA = a.time;
                    let timeB = b.time;
                    return timeA < timeB ? 1 : -1;
                })
                this.BlogInfo = blogList;
            })
        },
    },
})
