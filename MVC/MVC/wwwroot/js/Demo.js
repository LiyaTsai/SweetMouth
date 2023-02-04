var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        orgProductInfo: [],
        ProductInfo: [],
        productList: "",
        // ProductID: "",
        // ProductName: "",
        // Specifications: "",
        lowerPrice: [],
        smallSize: [],
        category: "常備品項",
        baseUrl: "https://localhost:7146/Home/productDetail",
        itempage: 0,
        value: "",
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
        _this.GetPrice();
        _this.GetSize();
        //_this.addToCart();
        //_this.checkClickEvent();
    },
    methods: {
        // 撈出所有品項
        MakeProInfo: function () {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Product`).then((a) => {
                _this.ProductInfo = a.data;
                _this.orgProductInfo = a.data; //給tab分頁用
                let arr = [];
                let x = this.ProductInfo.length;
                for (i = 0; i < x; i++) {
                    // 檢查上架狀態avalible
                    let item = {};
                    if (this.ProductInfo[i].avalible == true && this.ProductInfo[i].category === _this.category) {
                        item = this.ProductInfo[i];

                        // 切分tag標籤
                        item.tag = item.tag.split("|");

                        const tempArr = item.tag.filter((x) => x == "狗狗可食" || x == "含酒");
                        if (tempArr.length >= 1) {
                            item.tag = item.tag.filter((x) => x == "狗狗可食" || x == "含酒")[0];
                        } else {
                            item.tag = "";
                        }

                        // let taglength = this.ProductInfo[i].tag.length;
                        // for (j = 0; j < taglength; j++) {
                        //     // 找到有"狗狗可食"或"含酒"的標籤以顯示
                        //     if (this.ProductInfo[i].tag[j] == "狗狗可食" || this.ProductInfo[i].tag[j] == "含酒") {
                        //         //如有指定標籤則留下
                        //         let x = this.ProductInfo[i].tag[j];
                        //         this.ProductInfo[i].tag = [];
                        //         this.ProductInfo[i].tag = x;
                        //     }
                        // }
                        // // 其餘標籤均清空
                        // if (this.ProductInfo[i].tag.length > 1) {
                        //     this.ProductInfo[i].tag = "";
                        // }
                        arr.push(item);
                    }
                }
                _this.ProductInfo = arr;
                // console.log(this.ProductInfo.length);
                // console.log(this.ProductInfo);
            });
        },

        // 確認商品上架狀態、標籤篩選
        productCheck(_e) {
            let arr = [];
            let x = this.ProductInfo.length;
            for (i = 0; i < x; i++) {
                // 檢查上架狀態avalible
                let item = {};
                if (this.ProductInfo[i].avalible == true && this.ProductInfo[i].category === _e) {
                    item = this.ProductInfo[i];

                    // 切分tag標籤
                    item.tag = item.tag.split("|");

                    const tempArr = item.tag.filter((x) => x == "狗狗可食" || x == "含酒");
                    if (tempArr.length >= 1) {
                        item.tag = item.tag.filter((x) => x == "狗狗可食" || x == "含酒")[0];
                    } else {
                        item.tag = "";
                    }
                    arr.push(item);
                }
            }
            _this.ProductInfo = arr;
            console.log(this.ProductInfo);
        },

        // 預設標示最低價格
        GetPrice: function () {
            let _this = this;
            let p = 0;
            let arr = [];
            setTimeout(() => {
                // console.log(_this.ProductInfo);
                // console.log(typeof _this.ProductInfo[1].price);
                for (i = 0; i < _this.ProductInfo.length; i++) {
                    p = _this.ProductInfo[i].price.split("|")[0];
                    _this.ProductInfo[i].price = p;
                    arr.push(p);
                }
                _this.lowerPrice = arr;
            }, 200);
        },

        // 預設標示最小規格
        GetSize: function () {
            let _this = this;
            let s = "";
            let arr = [];
            setTimeout(() => {
                // console.log(_this.ProductInfo);
                // console.log(typeof _this.ProductInfo[1].price);
                for (i = 0; i < _this.ProductInfo.length; i++) {
                    s = _this.ProductInfo[i].size.split("|")[0];
                    _this.ProductInfo[i].size = s;
                    arr.push(s);
                }
                _this.smallSize = arr;
            }, 200);
        },

        // 分頁
        countpage() {
            //this.itempage = Math.ceil(this.itempage / 8);
            //console.log(this.itempage);
        },

        // 存到session
        addToCart(id, size, price, amount, e) {
            let _price = price.split("|")[0];
            let _size = size.split("|")[0];
            let session = localStorage;
            let _id = "";
            _id = id + "(" + _size;
            i = id - 10001;
            let _imageName =
                e.target.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[0].src.split(
                    "img/"
                )[1];
            if (session[_id]) {
                let _amount = 0;
                _amount = session.getItem(_id).split("|")[1];
                _amount++;
                value = `${_price}|${_amount}|${_imageName}`;
                session.removeItem(_id);
                session.setItem(_id, value);
            } else {
                //let value = `${_price}|${amount}|${_imageName}`;
                //session["productList"] += `|${_id}`;
                //session.setItem(_id, value);
                //session.setItem("productList", this.productList);
                let value = `${_price}|${amount}|${_imageName}`;
                this.productList = session["productList"];
                this.productList += `|${_id}`;
                session.setItem(_id, value);
                session.setItem("productList", this.productList);
            }
            // 動畫
            var buttons = document.getElementsByClassName("momo-menu-btn");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].onclick = function () {
                    let x = e.pageX - this.offsetWidth / 2;
                    let y = e.pageY - this.offsetWidth / 2;
                    createBall02(x, y);
                    console.log(x, y);
                };
            }

            function createBall02(x, y) {
                const bar = document.createElement("div");
                bar.style.position = "absolute";
                bar.style.left = "0";
                bar.style.top = "0";
                bar.style.width = "1rem";
                bar.style.height = "1rem";
                bar.style.borderRadius = "50%";
                bar.style.backgroundColor = "#F38B0B";
                // transform
                bar.style.transform = "translate(" + x + "px," + y + "px)";
                bar.style.transition = "transform 1s linear";

                document.body.appendChild(bar);
                // 添加动画属性
                setTimeout(() => {
                    let target = document.querySelector(".fa-shopping-cart");
                    let targetX = target.offsetLeft + target.offsetWidth / 2;
                    let targetY = target.offsetTop;
                    bar.style.transform = "translate(" + targetX + "px," + targetY + "px)";
                    // bar.style.transform = "translate(`${target}`)";
                }, 100);

                // 結束動畫
                bar.ontransitionend = function () {
                    this.remove();
                };
            }
        },

        // 類別標籤
        categoryChg: function (e) {
            const _this = this;
            var _e = e;
            _this.ProductInfo = _this.orgProductInfo.filter((x) => x.category === e); //篩選我要的分類
            _this.productCheck(_e);
            _this.GetPrice();
            _this.GetSize();
            console.log(e);
        },
        forSearchUse: function () {
            this.ProductInfo = [];
        },
        Search: function () {
            if (!this.value) {
                alert("請輸入關鍵字");
                return false;
            }
            axios.get(`${webApiBaseUri}api/Product?name=${this.value}`).then((a) => {
                if (a.data.length) {
                    _this.ProductInfo = a.data;
                } else {
                    alert("查無此資料");
                    return false;
                }
                let arr = [];
                for (i = 0; i < a.data.length; i++) {
                    // 檢查上架狀態avalible
                    let item = {};
                    item = this.ProductInfo[i];
                    // 切分tag標籤
                    item.tag = item.tag.split("|");
                    const tempArr = item.tag.filter((x) => x == "狗狗可食" || x == "含酒");
                    if (tempArr.length >= 1) {
                        item.tag = item.tag.filter((x) => x == "狗狗可食" || x == "含酒")[0];
                    } else {
                        item.tag = "";
                    }
                    arr.push(item);
                }
                _this.ProductInfo = arr;
            });
            this.GetPrice();
            this.GetSize();
        },
    },
});
