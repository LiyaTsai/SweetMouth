var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search;
//console.log(primaryKey);
//console.log(primaryKey.split("=")[2])
//console.log(primaryKey.split("=")[1].split("?")[0])

//https:URL?productName = 莓果?specifications = 顆
urlProductName = primaryKey.split("=")[1].split("?")[0];
urlSpecifications = primaryKey.split("=")[2];
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductName: "",
        Specifications: "",
        Price: 0,
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
            //let ProductName = primaryKey.split("=")[1];
            //let Specifications = primaryKey.split("=")[2];
            axios.get(`${webApiBaseUrl}api/Product/${urlProductName}/${urlSpecifications}`).then((a) => {
                _this.ProductName = a.data.productName;
                _this.Specifications = a.data.specifications;
                _this.Price = a.data.price;
                _this.imageName = a.data.imageName;
                _this.Avalible = a.data.avalible;
            });
        },
    },
});
setTimeout(function () {
    console.log(appVue.ProductName);
}, 100);
