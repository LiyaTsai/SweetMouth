var webApiBaseUrl = "https://localhost:7096/";  //axios請求會送到的Web Api網址
var articleID = window.location.search          //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"




var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        title: null,
        author: null,
        time: null,
        article: null,
        floors: [],                          //存放所有非樓主的文章資料(articleID一樣且樓層數大於等於1的)
        articlePoster: [],                      //存放樓主的文章資料(articleID一樣且樓層數等於零的)
        count: 0,
        TagInfo: [], // Tag
        Name: "",
        NickName:"",
    },
    mounted() {
        _this = this;
        _this.LogFloor();
        _this.MakeHashTag();
    },
    methods: {
        LogFloor: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {  //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {       //把所有抓出來的文章資料遍歷
                    if (a.data[i].articleID == articleID.split("=")[1]) {   //如果抓出來的資料中文章ID=Route中的文章ID
                        if (a.data[i].floor == 0) { _this.articlePoster.push(a.data[i]) }   //如果同樣的文章ID資料，樓層是0層，也就是樓主，就把它塞進articlePoster
                        else {                                  //其他同文章ID(同一篇文章下的留言)
                            _this.floors.push(a.data[i]);       //塞進floors
                        }
                    }
                    else { continue; }                          //GET出來的如果文章ID不符就跳過
                }
            });
        },
        // 新增留言
        insert: function () {
            let _this = this;
            let PP = {};
            let date=new Date(Date.now())
            let TT = "";
            TT += date.getFullYear() + "-";
            TT += (date.getMonth()+1)+ "-";
            TT += date.getDate() + " ";
            TT += date.getHours() + ":";
            TT += date.getMinutes() + ":";
            TT += date.getSeconds();
            console.log(TT)
            axios.get(`${webApiBaseUrl}api/Member/` + sessionStorage.getItem("MemberID")).then(a => {
                //console.log("MemberID:" + sessionStorage.getItem("MemberID"))
                //console.log("Name:" + a.data.name);
                //console.log("NickName:" + a.data.nickName);
                //console.log("文章ID:" + articleID.split("=")[1])
                //console.log("樓層:" + (_this.floors.length + 1))
                //console.log("時間:" + date)
                //console.log("內容:" + _this.article)


                PP.articleID = articleID.split("=")[1];
                PP.memberID = sessionStorage.getItem("MemberID");
                PP.floor = _this.floors.length + 1;
                PP.title = "";
                PP.subTitle = "";
                PP.time = TT;
                PP.article = _this.article;
                PP.memberName = a.data.name;
                PP.nickName = a.data.nickName;
            })

            console.log(PP)
            //var PP = {
            //    "articleID": articleID.split("=")[1],
            //    "memberID": sessionStorage.getItem("MemberID"),
            //    "floor": _this.floors.length+1,
            //    "title": "",
            //    "subTitle": "",
            //    "time":Date.now(),
            //    "article": _this.article,
            //    "memberName": name,
            //    "nickName": nickname
            //    }
            axios.post(`${webApiBaseUrl}api/Blogs`, PP).then(a => { alert("新增成功") })
            _this.LogFloor();
        },
        // Get Tag
        MakeHashTag: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/HashTag`).then(response => {
                let tagList = [];
                for (let i = 0; i < response.data.length; i++) {
                    tagList.push(response.data[i]);
                }

                let f_tagList = tagList.filter(function (item, index, tagList) {
                    //console.log(item)
                    return tagList.indexOf(item)
                })

                // let f_tagList = tagList.filter(function (item) {
                //     console.log(item.hashTag1)
                //     return item.hashTag1.match('蛋')
                // })

                _this.TagInfo = f_tagList;
            })
        },
    },
})
