var de = document.getElementById("de");
de.innerHTML += `<li>33333333333</li>`


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

        },
    },
})



