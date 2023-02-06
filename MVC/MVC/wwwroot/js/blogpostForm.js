var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        articlePostNum: null,
        Title: null,
        SubTitle: null,
        article: null,
        ProductInfo: [],
        // 圖片選擇參數
        selectedImg: 'newPostblog.jpg', // 預設圖片
        selectedProId: null,
    },
    mounted() {
        this.LogAricleID();
        this.LogProInfo();
    },
    methods: {
        // 撈文章ID
        LogAricleID: function () {
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                //_this.articlePostNum = res.data;
                for (let i = 0; i < res.data.length; i++) {
                    this.articlePostNum = res.data[i].articleID;
                }
                //console.log(this.articlePostNum)
            });

        },
        // 撈商品圖
        LogProInfo: function () {
            axios.get(`${webApiBaseUri}api/Product`).then(res => {
                this.ProductInfo = res.data;
                //console.log(this.ProductInfo);
            })
        },
        // 取商品ID
        getProId: function () {
            let obj = document.getElementById('selectItem');
            /*this.selectedProId = obj.options[obj.selectedIndex].text.split("|")[0];*/
            this.selectedProId = this.ProductInfo[obj.selectedIndex].productId;
            //console.log("selectedProId:" + this.selectedProId)
        },
        PostNewBlog: function () {
            let ret = confirm('確定要送出嗎?');
            let title = document.getElementById('inputTitle').value;
            let article = document.getElementById('Postarea').value;
            if (sessionStorage.getItem("MemberID") == null) {
                alert("請先登入會員")
            }
            else if (title == '') {
                alert('請輸入文章標題')
            }
            else if (article == '') {
                alert('請輸入內容')
            }
            else if (ret == false) {
                return;
            }
            else {
                let request = {};
                let Time = new Date();

                request.articleID = this.articlePostNum += 1;
                //console.log(_this.articlePostNum)
                //console.log(this.selectedProId);
                request.memberID = sessionStorage.getItem("MemberID");
                request.floor = 0;
                request.productID = this.selectedProId;
                request.time = Time;
                request.imageName = this.selectedImg;
                request.title = this.Title;
                request.SubTitle = this.SubTitle;
                request.Article = this.article;
                axios.post(`${webApiBaseUri}api/Blogs`, request).then(res => {
                    alert("發文成功")
                    window.location = "/Home/Blog"
                })
            }
        },
        FillData: function () {
            this.selectedProId = 10006;
            this.Title = "新文章標題";
            this.SubTitle = "哈囉你好我是次標題呦!"
            this.article = "感謝各位蒞臨我們結業專題的發表現場，酒鬼芭娜娜很好吃喔"
            this.selectedImg = "blackChocolate.jpg"
        },
        Clear: function () {
            this.Title = "";
            this.SubTitle = ""
            this.article = ""
            this.selectedImg = "newPostblog.jpg"
        }
    },
})
