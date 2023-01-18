var de = document.getElementById("de");
//de.innerHTML += `<li>33333333333</li>`

var webApiBaseUri = "https://localhost:7096/"; //����e�������|�g�_�ӥH�ᴫ����o�N�n
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductInfo: [],
        // ProductID: "",
        // ProductName: "",
        // Specifications: "",
        lowerPrice: [],
        // Flavor: "",
        // Size: "",
        // imageName: "",
        // Avalible: "",
        // Tag: "",
        // Description: "",
        baseUrl: "https://localhost:7146/Home/productDetail",
        itempage: 0,
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
        _this.GetPrice();
    },
    methods: {
        MakeProInfo: function () {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Product`).then((a) => {
                _this.ProductInfo = a.data;
                let arr = [];
                for (i = 0; i < this.ProductInfo.length; i++) {
                    let item = {};
                    if (this.ProductInfo[i].avalible == true) {
                        item = this.ProductInfo[i];
                        arr.push(item);
                    }
                }
                _this.ProductInfo = arr;
            });
        },

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

        countpage() {
            //this.itempage = Math.ceil(this.itempage / 8);
            //console.log(this.itempage);
        },
    },
});
