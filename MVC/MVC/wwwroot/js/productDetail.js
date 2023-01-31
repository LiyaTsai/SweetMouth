var webApiBaseUrl = "https://localhost:7096/"; //axios請求會送到的Web Api網址
var primaryKey = window.location.search;
urlProductID = primaryKey.split("=")[1];

let momoSizeBtn = document.querySelectorAll("button[class='btn momo-pd-size']");
//let amount = document.querySelector("#productAmount");
//amount = document.getElementById("productAmount")

console.log(momoSizeBtn);
momoSizeBtn[0].addEventListener("click", function () {
    momoSizeBtn[0].style.backgroundColor = "#C73F13";
    momoSizeBtn[0].style.color = "#FFFACA";
    momoSizeBtn[0].style.boxShadow = "0 0 0 .05rem #C73F13";
    // 罷工
});

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        productID: "",
        productName: "",
        // Specifications: "",
        arraykey: 0,
        PriceArray: [],
        price: "",
        flavor: "",
        size: "",
        sizeArray: "",
        imageName: "",
        tag: "",
        description: "",
        tagArray: [],
        currentSize: "",
        amount: 0,
    },
    mounted() {
        _this = this;
        _this.GetProduct();
        //_this.specification();
        setTimeout(() => {
            if (_this.sizeArray.length == 1) {
                this.price = `價格  $${this.PriceArray[0]}`;
                this.currentSize = _this.size[0];
                this.arraykey = 0;
                document.getElementById("productAmount").value = 1;
                this.amount = 1;
                Mother = document.getElementsByClassName("btn momo-pd-size");
                Mother[0].style = "background:rgb(199,63,19); color:white;box-shadow: 0 0 0 .05rem rgb(199,63,19)";
            }
        }, 200);
    },
    methods: {
        GetProduct: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Product/${urlProductID}`).then((a) => {
                // console.log(a.data);
                _this.productID = urlProductID;
                _this.productName = a.data.productName;
                _this.flavor = a.data.flavor;
                _this.size = a.data.size.split("|");
                // currentSize = _this.size[0];
                _this.sizeArray = a.data.size.split("|");
                _this.tag = a.data.tag;

                //先弄一個放價格的array出來，如果裡面只有一項，就拿來當價格，如果有一項以上就請顧客選擇規格
                _this.PriceArray = a.data.price.split("|");
                _this.price = _this.PriceArray.length == 1 ? _this.PriceArray[0] : "請選擇規格";

                _this.imageName = a.data.imageName;
                _this.description = a.data.description;
                _this.tagArray = a.data.tagArray;
            });

            setTimeout(() => {
                // console.log("價格陣列長度 " + _this.PriceArray.length);
                for (let i = 0; i < _this.PriceArray.length; i++) {
                    // console.log("價格 " + _this.PriceArray[i]);
                }
            }, 200);
        },
        specification: function (x, e) {
            this.price = `價格  $${this.PriceArray[x]}`;
            this.currentSize = _this.size[x];
            this.arraykey = x;
            this.amount = 1;
            document.getElementById("productAmount").value = 1;
            Mother = document.getElementsByClassName("btn momo-pd-size");
            for (let i = 0; i < Mother.length; i++) {
                Mother[i].style = "background:white; color:rgb(255,108,62);";
            }
            e.target.style = "background:rgb(199,63,19); color:white;box-shadow: 0 0 0 .05rem rgb(199,63,19)";
        },
        addToCart: function () {
            if (this.price == "請選擇規格") {
                alert("請選擇規格");
            } else {
                let _price = this.PriceArray[this.arraykey];
                let session = localStorage;
                let _id = urlProductID + "(" + this.currentSize;
                let _imageName = this.imageName;               
                if (session[_id]) {
                    let _amount = parseInt(session.getItem(_id).split("|")[1]);
                    _amount += parseInt(this.amount);
                    value = `${_price}|${_amount}|${_imageName}`;
                    session.removeItem(_id);
                    session.setItem(_id, value);
                } else {
                    let value = `${_price}|${parseInt(this.amount)}|${_imageName}`;
                    session["productList"] += `|${_id}`;
                    session.setItem(_id, value);
                    session.setItem("productList", productList);
                }
            }
        },
        amountChange: function (e) {
            this.amount = e.target.value;
            if (this.price != "請選擇規格") { this.price = "價格 $" + parseInt(this.PriceArray[this.arraykey]) * this.amount; }
            else { alert("請選擇規格"); e.target.value = 1; this.amount = e.target.value; }
        },
    },
});

// setTimeout(function () {
//     console.log(appVue.ProductName);
// }, 100);
