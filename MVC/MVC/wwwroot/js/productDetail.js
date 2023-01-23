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
        imageName: "",
        tag: "",
        description: "",
        tagArray: [],
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
                _this.tag = a.data.tag;

                //先弄一個放價格的array出來，如果裡面只有一項，就拿來當價格，如果有一項以上就請顧客選擇規格
                _this.PriceArray = a.data.price.split("|");
                _this.price = _this.PriceArray.length == 1 ? _this.PriceArray[0] : "請選擇規格";

                _this.imageName = a.data.imageName;
                _this.description = a.data.description;
                _this.tagArray = a.data.tagArray;
            });

            setTimeout(() => {
                console.log(_this.PriceArray.length);
                for (let i = 0; i < _this.PriceArray.length; i++) {
                    console.log(_this.PriceArray[i]);
                }
            }, 200);
        },
        specification: function (x) {
            //console.log("在specification裡");
            //console.log(x)
            //console.log(_this.PriceArray[x])
            this.price = `$${this.PriceArray[x]}`;
        },
    },
});
// setTimeout(function () {
//     console.log(appVue.ProductName);
// }, 100);
