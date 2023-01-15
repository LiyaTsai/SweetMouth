var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search; //把跳轉後的網址中 ?id= ，也就是query紀錄抓出來，這裡 articleID="?id={文章ID}"

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
        // _this.MakeHashTag();
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            let ProductName = primaryKey.split("=")[1];
            let Specifications = primaryKey.split("=")[2];
            // _this.floors = [];
            axios.get(`${webApiBaseUrl}api/productDetail`).then((a) => {
                //先抓出所有的Blog文章資料
                for (let i = 0; i < a.data.length; i++) {
                    //把所有抓出來的文章資料遍歷
                    if (a.data[i].ProductName == ProductName && a.data[i].Specifications == Specifications) {
                        //如果抓出來的資料中文章ID=Route中的文章ID
                        _this.Price.push(a.data[i]);
                        _this.imageName.push(a.data[i]);
                    } else {
                        continue;
                    } //GET出來的如果文章ID不符就跳過
                }
            });
        },
    },
});
