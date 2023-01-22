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
        price: 0,
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
        _this.spcification();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Product/${urlProductID}`).then((a) => {
                console.log(a.data);
                _this.productID = a.data.productID;
                _this.productName = a.data.productName;
                _this.flavor = a.data.flavor;
                _this.size = a.data.size.split("|");
                _this.tag = a.data.tag;
                _this.Price = a.data.price.split("|");
                _this.imageName = a.data.imageName;
                _this.description = a.data.description;
                _this.tagArray = a.data.tagArray;
            });
            console.log(_this.description);
        },
        spcification() {
            // if (size.lenght)
        },
    },
});
// setTimeout(function () {
//     console.log(appVue.ProductName);
// }, 100);
