<<<<<<< HEAD
var webApiBaseUrl = "https://localhost:7096/";  //先把前面的路徑寫起來以後換機改這就好
var articleID = window.location.search
=======
var webApiBaseUrl = "https://localhost:7096/";  //axios隢�瘙���������啁��Web Api蝬脣��
var articleID = window.location.search          //���頝唾��敺����蝬脣��銝� ?id= 嚗�銋�撠望�益uery蝝���������箔��嚗����鋆� articleID="?id={���蝡�ID}"


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
        floors: [],                          //摮���暹��������璅�銝餌�����蝡�鞈����(articleID銝�璅�銝�璅�撅斗�詨之��潛�����1���)
        articlePoster: [],                   //摮���暹��銝餌�����蝡�鞈����(articleID銝�璅�銝�璅�撅斗�貊����潮�嗥��)
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
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {  //��������箸��������Blog���蝡�鞈����
                for (let i = 0; i < a.data.length; i++) {       //��������������箔��������蝡�鞈�������甇�
                    if (a.data[i].articleID == articleID.split("=")[1]) {   //憒���������箔�����鞈����銝剜��蝡�ID=Route銝剔�����蝡�ID
                        if (a.data[i].floor == 0) {
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0]
                            _this.articlePoster.push(item)
                        }   //憒�������璅�������蝡�ID鞈����嚗�璅�撅斗��0撅歹��銋�撠望�舀��銝鳴��撠望��摰�憛���淮rticlePoster
                        else {                                  //��嗡��������蝡�ID(���銝�蝭����蝡�銝�������閮�)
                            _this.floors.push(a.data[i]);       //憛���淬loors
                        }
                    } else {
                        continue;
                    } //GET��箔�����憒�������蝡�ID銝�蝚血停頝喲��
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
        // ��������澆��
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

        // ��啣�����閮�
        insert: function () {
            if (sessionStorage.getItem("MemberID") == null) {
                alert("隢������餃�交�����!!");
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
                    alert("���閮�������");
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
                    return item.hashTag1.match("���");
                });

                _this.TagInfo = f_tagList;
            });
        },
    },
});
>>>>>>> Development
