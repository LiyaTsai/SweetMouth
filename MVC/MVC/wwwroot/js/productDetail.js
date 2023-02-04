var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search;
urlProductID = primaryKey.split("=")[1];

let momoSizeBtn = document.querySelectorAll("button[class='btn momo-pd-size']");
//let amount = document.querySelector("#productAmount");
//amount = document.getElementById("productAmount")

console.log(momoSizeBtn);
momoSizeBtn[0].addEventListener("click", function () {
    momoSizeBtn[0].style.backgroundColor = "#C73F13";
    momoSizeBtn[0].style.color = "#FFFACA";
    momoSizeBtn[0].style.boxShadow = "0 0 0 .05rem #C73F13";
    // 罷工
});

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        productID: "",
        productName: "",
        // Specifications: "",
        arraykey: 0,
        PriceArray: [],
        price: "",
        flavor: "",
        size: "",
        sizeArray: "",
        imageName: "",
        tag: "",
        description: "",
        tagArray: [],
        currentSize: "",
        amount: 0,
        productList:null,
    },
    mounted() {
        _this = this;
        _this.GetProduct();       
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Product/${urlProductID}`).then((a) => {
                // console.log(a.data);
                _this.productID = urlProductID;
                _this.productName = a.data.productName;
                _this.flavor = a.data.flavor;
                _this.size = a.data.size.split("|");
                // currentSize = _this.size[0];
                _this.sizeArray = a.data.size.split("|");
                _this.tag = a.data.tag;

                //先弄一個放價格的array出來，如果裡面只有一項，就拿來當價格，如果有一項以上就請顧客選擇規格
                _this.PriceArray = a.data.price.split("|");
                _this.price = _this.PriceArray.length == 1 ? "價格 $"+_this.PriceArray[0] : "請選擇規格";

                _this.imageName = a.data.imageName;
                _this.description = a.data.description;
                _this.tagArray = a.data.tagArray;          
                this.$nextTick(function () {
                    if (this.PriceArray.length == 1) {
                        Mother = document.getElementsByClassName("btn momo-pd-size");
                        Mother[0].style = "background:white; color:rgb(255,108,62);";
                    }
                })
            });
        },
        specification: function (x, e) {
            this.price = `價格  $${this.PriceArray[x]}`;
            this.currentSize = this.size[x];
            this.arraykey = x;
            this.amount = 1;
            document.getElementById("productAmount").value = 1;
            Mother = document.getElementsByClassName("btn momo-pd-size");
            for (let i = 0; i < Mother.length; i++) {
                Mother[i].style = "background:white; color:rgb(255,108,62);";
            }
            e.target.style = "background:rgb(199,63,19); color:white;box-shadow: 0 0 0 .05rem rgb(199,63,19)";
        },
        addToCart: function (e) {
            if (this.price == "請選擇規格") {
                alert("請選擇規格");
            } else {
                let _price = this.PriceArray[this.arraykey];
                let session = localStorage;
                let _id = urlProductID + "(" + this.currentSize;
                let _imageName = this.imageName;

                // 存到local Storage
                if (session[_id]) {
                    let _amount = parseInt(session.getItem(_id).split("|")[1]);
                    _amount += parseInt(this.amount);
                    value = `${_price}|${_amount}|${_imageName}`;
                    session.removeItem(_id);
                    session.setItem(_id, value);
                } else {
                    let value = `${_price}|${parseInt(this.amount)}|${_imageName}`;
                    //session["productList"] += `|${_id}`;
                    //session.setItem(_id, value);
                    //session.setItem("productList", this.productList);
                    this.productList = session["productList"];
                    this.productList += `|${_id}`;
                    session.setItem(_id, value);
                    session.setItem("productList", this.productList);
                }
                // 動畫
                var buttons = document.getElementsByClassName("momo-pd-cartAnimation");
                for (let i = 0; i < buttons.length; i++) {
                    buttons[i].onclick = function () {
                        let x = event.pageX - this.offsetWidth / 2;
                        let y = event.pageY - this.offsetWidth / 2;
                        createBall01(x, y);
                        console.log(x, y);
                    };
                }
            }
            function createBall01(left, top) {
                console.log("ball01");
                let bar = document.createElement("div");
                bar.style.position = "absolute";
                bar.style.left = left + "px";
                bar.style.top = top + "px";
                bar.style.width = "1rem";
                bar.style.height = "1rem";
                bar.style.borderRadius = "50%";
                bar.style.backgroundColor = "#F38B0B";
                bar.style.transition = "left 1s linear, top 1s cubic-bezier(0.7, -0.3, 1, 1)";

                document.body.appendChild(bar);
                // 添加动画属性
                setTimeout(() => {
                    let target = document.querySelector(".fa-shopping-cart");
                    bar.style.left = target.offsetLeft + target.offsetWidth / 2 + "px";
                    bar.style.top = target.offsetTop + "px";
                }, 0);

                // 結束動畫
                bar.ontransitionend = function () {
                    this.remove();
                };
            }
        },

        amountChange: function (e) {
            this.amount = e.target.value;
            console.log(this.PriceArray)
            console.log(this.PriceArray[this.arraykey])
            if (this.price != "請選擇規格") {
                this.price = "價格 $" + parseInt(this.PriceArray[this.arraykey]) * this.amount;
            } else {
                alert("請選擇規格");
                e.target.value = 1;
                this.amount = e.target.value;
            }
        },
    },
    watch: {
        PriceArray: function () {
            this.$nextTick(function () {
                if (this.PriceArray.length == 1) {
                    Mother = document.getElementsByClassName("btn momo-pd-size");
                    Mother[0].style = "background:white; color:rgb(255,108,62);";
                }
            })
        }
    }
});


// setTimeout(function () {
//     console.log(appVue.ProductName);
// }, 100);

//留言板
var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var articleID = window.location.search; //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"

var appVue2 = new Vue({
    el: "#appVue2",
    name: "appVue2",
    data: {
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
            axios.get(`${webApiBaseUrl}api/Blogs`).then((a) => {
                //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {
                    //把所有抓出來的文章資料遍歷
                    if (a.data[i].articleID == articleID.split("=")[1]) {
                        //如果抓出來的資料中文章ID=Route中的文章ID
                        if (a.data[i].floor == 0) {
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0];
                            if (item.imageName == null) {
                                item.imageName = item.productImageName;
                            }
                            if (item.tag == null) {
                                item.tag = "甜嘴MoBlog|問題討論";
                            }
                            // item.imageName ? item.imageName : item.imageName = item.productImageName;
                            // item.tag ? item.tag : item.tag = '無';
                            _this.articlePoster.push(item);
                        } //如果同樣的文章ID資料，樓層是0層，也就是樓主，就把它塞進articlePoster
                        else {
                            //其他同文章ID(同一篇文章下的留言)
                            let item = {};
                            item = a.data[i];
                            item.time = item.time.split("T")[0];
                            _this.floors.push(item); //塞進floors
                            //console.log(_this.floors)
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
                //let Time = _this.dateFormate();
                //console.log(Time)
                _this.floors.length += 1;

                request.ArticleID = articleID.split("=")[1]; //productID
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
            axios.put(`${webApiBaseUrl}api/Blogs/${articleID.split("=")[1]}/${item.floor}`, request).then((res) => {
                alert(res.data);
                _this.LogFloor();
                _this.cancel();
            });
        },

        // 刪除留言
        deletefloor: function (floor) {
            let ret = confirm("確定要刪除嗎?");
            if (ret == true) {
                axios.delete(`${webApiBaseUrl}api/Blogs/${articleID.split("=")[1]}/${floor}`).then((res) => {
                    alert(res.data);
                    _this.LogFloor();
                });
            }
        },
    },
});
