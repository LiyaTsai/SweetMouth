var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search;
//console.log(primaryKey);
//console.log(primaryKey.split("=")[2])
//console.log(primaryKey.split("=")[1].split("?")[0])

//https:URL?productName = 莓果?specifications = 顆
// urlProductName = primaryKey.split("=")[1].split("?")[0];
// urlSpecifications = primaryKey.split("=")[2];
urlProductID = primaryKey.split("=")[1];
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        productID: "",
        productName: "",
        // Specifications: "",
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
    },
    mounted() {
        _this = this;
        _this.GetProduct();
        _this.specification();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Product/${urlProductID}`).then((a) => {
                // console.log(a.data);
                _this.productID = a.data.productID;
                _this.productName = a.data.productName;
                _this.flavor = a.data.flavor;
                _this.size = a.data.size.split("|");
                currentSize = _this.size[0];
                _this.sizeArray = a.data.size.split("|");
                _this.tag = a.data.tag;

                //先弄一個放價格的array出來，如果裡面只有一項，就拿來當價格，如果有一項以上就請顧客選擇規格
                _this.PriceArray = a.data.price.split("|");
                _this.price = _this.PriceArray.length == 1 ? _this.PriceArray[0] : "請選擇規格";

                _this.imageName = a.data.imageName;
                _this.description = a.data.description;
                _this.tagArray = a.data.tagArray;
            });

            setTimeout(() => {
                // console.log("價格陣列長度 " + _this.PriceArray.length);
                for (let i = 0; i < _this.PriceArray.length; i++) {
                    // console.log("價格 " + _this.PriceArray[i]);
                }
            }, 200);
        },
        specification: function (x) {
            //console.log("在specification裡");
            //console.log(x)
            //console.log(_this.PriceArray[x])
            this.price = `價格  $${this.PriceArray[x]}`;
            console.log();

            console.log("x = " + x);
            console.log(_this.size[x]);
        },

        addToCart(size, price) {
            let amount = document.querySelector("#productAmount").value;
            let id = urlProductID;
            console.log(amount);
            console.log(size);
            console.log(price);

            // let _price = price.split("|")[0];
            // let _size = size.split("|")[0];
            let session = sessionStorage;

            // if (session[id]) {
            //     let _amount = 0;
            //     _amount = session.getItem(id).split("|")[2];
            //     _amount++;
            //     value = `${_size}|${_price}|${_amount}`;
            //     session.removeItem(id);
            //     session.setItem(id, value);
            // } else {
            //     let value = `${_size}|${_price}|${amount}`;
            //     session.setItem(id, value);
            // }
        },
    },
});

// setTimeout(function () {
//     console.log(appVue.ProductName);
// }, 100);
