var de = document.getElementById("de");
//de.innerHTML += `<li>33333333333</li>`


var webApiBaseUri = "https://localhost:7096/";  //����e�������|�g�_�ӥH�ᴫ����o�N�n
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        ProductInfo: [],
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
    },
    methods: {
        MakeProInfo:function() {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Product`).then(a => {
                _this.ProductInfo = a.data;
                
            })
            for (let i = 0; i < _this.ProductInfo.length; i++) {
                console.log(_this.ProductInfo[i].avalible)
                if (_this.ProductInfo[i].avalible == false) {
                    alert(_this.ProductInfo[i])
                    _this.ProductInfo[i].pop;
                    
                }
            }
            
        },
        toPD() {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Product`).then(a => {


            })
            
        }
    },
})



