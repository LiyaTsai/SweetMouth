let session = sessionStorage;

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        productID: "",
        productName: "",
        PriceArray: [],
        price: "",
        flavor: "",
        size: "",
        imageName: "",
    },
    mounted() {
        let _this = this;
        _this.getProduct();
    },
    methods: {
        getProduct() {
            session.getItem;
        },
    },
});
