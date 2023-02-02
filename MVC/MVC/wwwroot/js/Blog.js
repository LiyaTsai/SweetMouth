var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        baseUrl: "https://localhost:7146/Home/blogPage",
        NewsInfo: [],
        ProInfo: [],
        BlogInfo: [],
        SearchInfo: [],
        // 搜尋關建字
        keyWord: null,
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
            let year = date.getFullYear();
            let month = date.getMonth() + 1;
            // let day = date.getDate();
            // let hours = date.getHours();
            // let minutes = date.getMinutes();
            // let seconds = date.getSeconds();
            return year + '-' + + '0' + month;
        },
        News: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                this.NewsInfo = res.data;
                let date = this.dateFormate().toString();
                let dateYear = date.split("-")[0];
                let dateMonth = date.split("-")[1];
                let NewsList = [];
                for (i = 0; i < this.NewsInfo.length; i++) {
                    let item = {};
                    if (this.NewsInfo[i].floor == 0 && this.NewsInfo[i].time.split("-")[0] == dateYear && this.NewsInfo[i].time.split("-")[1] == dateMonth) {
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
                    if (this.ProInfo[i].productID != null && this.ProInfo[i].floor == 0) {
                        item = this.ProInfo[i];
                        item.time = item.time.split("T")[0];
                        if (item.imageName == null) {
                            item.imageName = item.productImageName;
                        }
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
                        if (item.imageName == null) {
                            item.imageName = item.productImageName;
                        }
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

        // 搜尋文章
        Search: function () {
            let searchInput = document.getElementById('searchInput').value;
            if (searchInput == '') {
                document.getElementById('errMessage').textContent = '請輸入關鍵字!!';
                return;
            } else {
                let request = {};
                request.title = this.keyWord;
                request.nickName = this.keyWord;

                axios.post(`${webApiBaseUri}api/Blogs/FilterTitle`, request).then(res => {
                    if (res.data.length == 0) {
                        //alert('找不到文章!!')
                        document.getElementById('errMessage').textContent = '找不到文章!!';
                    } else {
                        document.getElementById('errMessage').textContent = '';
                    }
                    let itemList = [];
                    for (i = 0; i < res.data.length; i++) {
                        if (res.data[i].floor == 0) {
                            //console.log(res.data[i])
                            let item = {};
                            item = res.data[i];
                            item.time = item.time.split("T")[0];
                            if (item.imageName == null) {
                                item.imageName = item.productImageName;
                            }
                            itemList.push(item);
                        }
                    }
                    //console.log(itemList);
                    this.SearchInfo = itemList;
                    this.keyWord = '';
                })
            }
        },

        // Enter 搜尋
        pressEnter: function () {
            $(document).ready(function () {
                $('#searchInput').keypress(function (e) {
                    let key = window.event ? e.keyCode : e.which;
                    if (key == 13)
                        $('#btnSearch').click();
                });
            });
        },
    },
})
