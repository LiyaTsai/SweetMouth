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
            });
        },
        // 撈商品圖
        LogProInfo: function () {
            axios.get(`${webApiBaseUri}api/Product`).then(res => {
                this.ProductInfo = res.data;
                //console.log(this.ProductInfo);
            })
        },
        // 取得商品ID
        getProId: function () {
            let obj = document.getElementById('selectItem');
            this.selectedProId = obj.options[obj.selectedIndex].text.split("|")[0];
        },
        PostNewBlog: function () {
            if (sessionStorage.getItem("MemberID") == null) {
                alert("請先登入會員")
            } else {
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
    },
})
