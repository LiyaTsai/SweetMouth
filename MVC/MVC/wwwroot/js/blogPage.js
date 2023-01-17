<<<<<<< HEAD
var webApiBaseUrl = "https://localhost:7096/";  //����e�������|�g�_�ӥH�ᴫ����o�N�n
var articleID = window.location.search
=======
var webApiBaseUrl = "https://localhost:7096/";  //axios請求會送到的Web Api網址
var articleID = window.location.search          //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"


>>>>>>> Development
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        title: null,
        author: null,
        time: null,
        article: null,
<<<<<<< HEAD
        floors: [],
        articlePoster: [],
=======
        floors: [],                          //存放所有非樓主的文章資料(articleID一樣且樓層數大於等於1的)
        articlePoster: [],                   //存放樓主的文章資料(articleID一樣且樓層數等於零的)
        TagInfo: [], // Tag
        nickName: sessionStorage.getItem("nickName"),
>>>>>>> Development
    },
    mounted() {
        _this = this;
        _this.LogFloor();
    },
    methods: {
        LogFloor: function () {
            let _this = this;
<<<<<<< HEAD
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {
                for (let i = 0; i < a.data.length; i++) {
                    if (a.data[i].articleID == articleID.split("=")[1]) {
                        if (a.data[i].floor == 0) { _this.articlePoster.push(a.data[i]) }
                        else {
                            console.log(a.data[i]);
                            _this.floors.push(a.data[i]);
                        }
                    }
                    else { continue; }
=======
            _this.floors = [];
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {  //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {       //把所有抓出來的文章資料遍歷
                    if (a.data[i].articleID == articleID.split("=")[1]) {   //如果抓出來的資料中文章ID=Route中的文章ID
                        if (a.data[i].floor == 0) {
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0]
                            _this.articlePoster.push(item)
                        }   //如果同樣的文章ID資料，樓層是0層，也就是樓主，就把它塞進articlePoster
                        else {                                  //其他同文章ID(同一篇文章下的留言)
                            _this.floors.push(a.data[i]);       //塞進floors
                        }
                    } else {
                        continue;
                    } //GET出來的如果文章ID不符就跳過
>>>>>>> Development
                }
                //console.log(_this.floors)
            });
<<<<<<< HEAD
            console.log(articleID.split("=")[1])
        },
    },
})



=======
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
                console.log(Time)
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
>>>>>>> Development
