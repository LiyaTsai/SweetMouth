var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var ProductName = window.location.search; //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"
// var Specifications = window.location.search; //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductName: [],
        Specifications: [],
        Price: [],
        imageName: [],
        Avalible: [],
    },
    mounted() {
        _this = this;
        _this.GetProduct();
        // _this.MakeHashTag();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            // _this.floors = [];
            axios.get(`${webApiBaseUrl}api/productDetail`).then((a) => {
                //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {
                    //把所有抓出來的文章資料遍歷
                    if (a.data[i].articleID == articleID.split("=")[1]) {
                        //如果抓出來的資料中文章ID=Route中的文章ID
                        if (a.data[i].floor == 0) {
                            _this.articlePoster.push(a.data[i]);
                        } //如果同樣的文章ID資料，樓層是0層，也就是樓主，就把它塞進articlePoster
                        else {
                            //其他同文章ID(同一篇文章下的留言)
                            _this.floors.push(a.data[i]); //塞進floors
                        }
                    } else {
                        continue;
                    } //GET出來的如果文章ID不符就跳過
                }
            });
        },

        // 新增留言
        insert: function () {
            if (sessionStorage.getItem("MemberID") == null) {
                alert("請先登入會員!!");
            } else {
                let _this = this;
                let request = {};
                let Time = new Date();
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

        // Get Tag
        MakeHashTag: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/HashTag`).then((response) => {
                let tagList = [];
                for (let i = 0; i < response.data.length; i++) {
                    tagList.push(response.data[i]);
                }

                // let f_tagList = tagList.filter(function (item, index, tagList) {
                //     //console.log(item)
                //     return tagList.indexOf(item)
                // })

                let f_tagList = tagList.filter(function (item) {
                    //console.log(item.hashTag1)
                    return item.hashTag1.match("蛋");
                });

                _this.TagInfo = f_tagList;
            });
        },
    },
});