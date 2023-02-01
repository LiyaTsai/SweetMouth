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
    },
    mounted() {
        this.LogAricleID();
        this.LogProInfo();
    },
    methods: {
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
            let productList = [];
            axios.get(`${webApiBaseUri}api/Product`).then(res => {
                for (i = 0; i < res.data.length; i++) {
                    if (res.data[i].avalible == true && res.data[i].category == '常備品項') {
                        let item = [];
                        item = res.data[i];
                        productList.push(item);
                    }
                }
                this.ProductInfo = productList;
                console.log(this.ProductInfo);
            })
        },
        PostNewBlog: function () {
            if (sessionStorage.getItem("MemberID") == null) {
                alert("請先登入會員")
            } else {
                let request = {};
                let Time = new Date();

                request.articleID = this.articlePostNum += 1;
                //console.log(_this.articlePostNum)
                request.memberID = sessionStorage.getItem("MemberID");
                request.floor = 0;
                request.productID = null;
                request.time = Time;
                request.imageName = 'newPostblog.jpg'; // 預設圖片
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
