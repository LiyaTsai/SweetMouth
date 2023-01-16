var de = document.getElementById("de");
//de.innerHTML += `<li>33333333333</li>`

var webApiBaseUri = "https://localhost:7096/"; //����e�������|�g�_�ӥH�ᴫ����o�N�n
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductInfo: [],
        baseUrl: "https://localhost:7146/Home/productDetail",
        itempage: 0,
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
    },
    methods: {
        MakeProInfo: function () {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Product`).then((a) => {
                _this.ProductInfo = a.data;
                console.log(this.ProductInfo.length);
            });
            for (let i = 0; i < _this.ProductInfo.lenght; i++) {
                /*if (_this.ProductInfo[i].avalible == false) {
                    _this.ProductInfo[i].pop;
                }*/
            }
        },

        countpage() {
            //this.itempage = Math.ceil(this.itempage / 8);
            //console.log(this.itempage);
        },
    },
});
