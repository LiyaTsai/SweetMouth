var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search;

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductName: [],
        Specifications: [],
        Price: [],
        imageName: [],
        Avalible: [],
    },
    mounted() {
        _this = this;
        _this.GetProduct();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            let ProductName = primaryKey.split("=")[1];
            let Specifications = primaryKey.split("=")[2];
            axios.get(`${webApiBaseUrl}api/productDetail`).then((a) => {
                for (let i = 0; i < a.data.length; i++) {
                    if (a.data[i].ProductName == ProductName && a.data[i].Specifications == Specifications) {
                        _this.Price.push(a.data[i]);
                        _this.imageName.push(a.data[i]);
                    } else {
                        continue;
                    }
                }
            });
        },
    },
});
