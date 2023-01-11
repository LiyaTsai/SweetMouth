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
        floors: [],                             //存放所有非樓主的文章資料(articleID一樣且樓層數大於等於1的)
        articlePoster: [],                      //存放樓主的文章資料(articleID一樣且樓層數等於零的)
        TagInfo: [], // Tag
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

        // Get Tag
        MakeHashTag: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/HashTag`).then(response => {
                let tagList = [];
                for (let i = 0; i < response.data.length; i++) {
                    tagList.push(response.data[i]);
                }

                let f_tagList = tagList.filter(function (item, index, tagList) {
                    console.log(item)
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
