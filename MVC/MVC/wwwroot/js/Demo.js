var webApiBaseUri = "https://localhost:7096/"; //����e�������|�g�_�ӥH�ᴫ����o�N�n
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
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
        _this.GetPrice();
        _this.GetSize();
        _this.addToCart();
        _this.checkClickEvent();
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
        addToCart(id, size, price, amount) {
            // console.log(size);
            let _price = price.split("|")[0];
            let _size = size.split("|")[0];
            let session = sessionStorage;
            let _id = 0;
            _id = id;
            i = _id - 10001;
            let _imageName = _this.ProductInfo[i].imageName;

            if (session[id]) {
                let _amount = 0;
                _amount = session.getItem(id).split("|")[2];
                _amount++;
                value = `${_size}|${_price}|${_amount}|${_imageName}`;
                session.removeItem(id);
                session.setItem(id, value);
            } else {
                let value = `${_size}|${_price}|${amount}|${_imageName}`;
                session["productList"] += `|${id}`;
                session.setItem(id, value);
                session.setItem("productList", productList);
            }
        },

        // 類別標籤
        categoryChg(e) {
            const _this = this;
            var _e = e;
            _this.ProductInfo = _this.orgProductInfo.filter((x) => x.category === e); //篩選我要的分類
            _this.productCheck(_e);
            _this.GetPrice();
            _this.GetSize();
            console.log(e);
        },
    },
});
