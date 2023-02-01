var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var articleID = window.location.search; //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"


var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        baseUrl: "https://localhost:7146/Home/productDetail", // Tag 連結到商品購買頁面
        title: null,
        author: null,
        time: null,
        article: null,
        floors: [], //存放所有非樓主的文章資料(articleID一樣且樓層數大於等於1的)
        articlePoster: [], //存放樓主的文章資料(articleID一樣且樓層數等於零的)
        MemberID: sessionStorage.getItem("MemberID"),
        nickName: sessionStorage.getItem("nickName"), //使用者暱稱
        // 編輯容器
        article_E: null,
    },
    mounted() {
        _this = this;
        _this.LogFloor();
    },
    methods: {
        LogFloor: function () {
            let _this = this;
            _this.floors = [];
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {  //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {       //把所有抓出來的文章資料遍歷
                    if (a.data[i].articleID == articleID.split("=")[1]) {   //如果抓出來的資料中文章ID=Route中的文章ID
                        if (a.data[i].floor == 0) {
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0]
                            if (item.imageName == null) {
                                item.imageName = item.productImageName;
                            }
                            if (item.tag == null) {
                                item.tag = '甜嘴MoBlog|綜合討論';
                                $(document).ready(function () {
                                    $("#tagLink").attr('href', 'javascript:void(0)'); // 部落格文章連結停止跳轉
                                });
                            }
                            // item.imageName ? item.imageName : item.imageName = item.productImageName;
                            // item.tag ? item.tag : item.tag = '無';
                            _this.articlePoster.push(item)
                        }   //如果同樣的文章ID資料，樓層是0層，也就是樓主，就把它塞進articlePoster
                        else {                                  //其他同文章ID(同一篇文章下的留言)
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0]
                            _this.floors.push(item);       //塞進floors
                            //console.log(_this.floors)
                        }
                    } else { continue; } //GET出來的如果文章ID不符就跳過
                }
            });
        },

        // 時間格式
        // dateFormate: function () {
        //     let date = new Date();
        //     let year = date.getFullYear();
        //     let month = date.getMonth() + 1;
        //     let day = date.getDate();
        //     let hours = date.getHours();
        //     let minutes = date.getMinutes();
        //     let seconds = date.getSeconds();
        //     return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
        // },

        // 新增留言
        insert: function () {
            if (sessionStorage.getItem("MemberID") == null) {
                alert("請先登入會員!!");
            } else {
                let _this = this;
                let request = {};
                let Time = new Date();
                //let Time = _this.dateFormate();
                //console.log(Time)
                _this.floors.length += 1;

                request.ArticleID = articleID.split("=")[1];
                request.MemberID = sessionStorage.getItem("MemberID");
                request.Floor = _this.floors.length;
                request.Time = Time;
                request.Article = _this.article;
                axios.post(`${webApiBaseUrl}api/Blogs`, request).then((res) => {
                    alert("留言成功");
                    _this.LogFloor();
                    _this.article = null;
                });
            }
        },

        // 編輯留言
        edit: function (floor) {
            let floorsList = [];
            for (i = 0; i < this.floors.length; i++) {
                let item = {};
                item = this.floors[i];
                if (floor == this.floors[i].floor) {
                    item.Edit = true;
                    _this.article_E = item.article;
                    //console.log(_this.article_E)
                } else {
                    item.Edit = false;
                }
                floorsList.push(item);
            }
            _this.floors = floorsList;
        },

        // 取消編輯
        cancel: function () {
            let floorsList = [];
            for (i = 0; i < this.floors.length; i++) {
                let item = {};
                item = this.floors[i];
                if (item.Edit == true) {
                    item.Edit = false;
                    item.article = _this.article_E;
                }
                floorsList.push(item);
            }
            _this.floors = floorsList;
        },

        // Post編輯留言
        update: function (item) {
            //console.log(item)
            let request = {};
            request.articleID = articleID.split("=")[1];
            request.floor = item.floor;
            request.memberID = sessionStorage.getItem("MemberID");
            request.time = new Date();
            request.article = item.article;
            axios.put(`${webApiBaseUrl}api/Blogs/${articleID.split("=")[1]}/${item.floor}`, request).then(res => {
                alert(res.data);
                _this.LogFloor();
                _this.cancel();
            })
        },

        // 刪除留言
        deletefloor: function (floor) {
            let ret = confirm('確定要刪除嗎?');
            if (ret == true) {
                axios.delete(`${webApiBaseUrl}api/Blogs/${articleID.split("=")[1]}/${floor}`).then(res => {
                    alert(res.data);
                    _this.LogFloor();
                })
            }
        },
    },
});
