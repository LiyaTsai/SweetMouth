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
                let x = this.ProductInfo.length;
                for (i = 0; i < x; i++) {
                    // 檢查上架狀態avalible
                    let item = {};
                    if (this.ProductInfo[i].avalible == true) {
                        item = this.ProductInfo[i];
                    }
                    // 切分tag標籤

                    this.ProductInfo[i].tag = this.ProductInfo[i].tag.split("|");

                    let a = this.ProductInfo[i].tag.filter((x) => x == "狗狗可食" || x == "含酒");
                    console.log(a);

                    let taglength = this.ProductInfo[i].tag.length;
                    for (j = 0; j < taglength; j++) {
                        // 找到有"狗狗可食"或"含酒"的標籤以顯示
                        if (this.ProductInfo[i].tag[j] == "狗狗可食" || this.ProductInfo[i].tag[j] == "含酒") {
                            //如有指定標籤則留下
                            let x = this.ProductInfo[i].tag[j];
                            this.ProductInfo[i].tag = [];
                            this.ProductInfo[i].tag = x;
                        }
                    }
                    // 其餘標籤均清空
                    if (this.ProductInfo[i].tag.length > 1) {
                        this.ProductInfo[i].tag = "";
                    }
                }
                console.log(this.ProductInfo);

                arr.push(item); //這裡報錯  Uncaught (in promise) ReferenceError: item is not defined
                _this.ProductInfo = arr;
                console.log(this.ProductInfo);
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

        addToCart() {
            let _this = this;
        },
    },
});
