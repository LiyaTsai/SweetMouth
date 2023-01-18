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
        ProductName: "",
        // Specifications: "",
        ProductID: "",
        Price: 0,
        Flavor: "",
        Size: "",
        imageName: "",
        Avalible: "",
    },
    mounted() {
        _this = this;
        _this.GetProduct();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Product/${urlProductID}`).then((a) => {
                // _this.ProductName = a.data.productName;
                // _this.Specifications = a.data.specifications;
                _this.ProductID = a.data.productID;
                _this.ProductName = a.data.ProductName;
                _this.Flavor = a.data.Flavor;
                _this.Size = a.data.Size;
                _this.Price = a.data.price;
                _this.imageName = a.data.imageName;
                _this.Avalible = a.data.avalible;
            });
            // console.log(_this.productName);
        },
    },
});
setTimeout(function () {
    console.log(appVue.ProductName);
}, 100);
