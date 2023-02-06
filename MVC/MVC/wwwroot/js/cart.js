let local = localStorage;
var webApiBaseUrl = "https://localhost:7096/";
var MemID =
    document.cookie.indexOf("MemberID") == -1
        ? sessionStorage.getItem("MemberID")
        : document.cookie.split("MemberID=")[1].split(";")[0];
//setTimeout(() => { console.log(document.getElementById("10003Input").value) },500)

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        IDandSpeArray: [],
        productArray: [],
        AmountArray: [],
        ImgArray: [],
        NameArray: [],
        FlavorArray: [],
        price: "",
        flavor: "",
        size: "",
        amount: "",
        imageName: "",
        memberName: "",
        memberPhone: "",
        memberAddress: "",
        totalPrice: 0,
        coupon: "",
        discount_info: "",
        speDis: 1,
        baseUrl: "https://localhost:7146/Home/productDetail",
    },
    mounted() {
        let _this = this;
        _this.getProduct();
    },
    methods: {
        getProduct() {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Member/` + MemID).then((a) => {
                _this.memberName = a.data.name;
                _this.memberPhone = a.data.phoneNumber;
                _this.memberAddress = a.data.address;
            });
            for (let i = 1; i < local.getItem("productList").split("|").length; i++) {
                _this.IDandSpeArray.push(local.getItem("productList").split("|")[i]);
            }
            _this.IDandSpeArray = _this.IDandSpeArray.sort();
            for (let i = 0; i < _this.IDandSpeArray.length; i++) {
                TempID = _this.IDandSpeArray[i].split("(")[0];
                axios.get(`${webApiBaseUrl}api/Product/${TempID}`).then((x) => {
                    TempObj = {};
                    TempObj = x.data;
                    TempObj.size = _this.IDandSpeArray[i].split("(")[1];
                    TempObj.amount = local.getItem(_this.IDandSpeArray[i]).split("|")[1];
                    TempObj.price = local.getItem(_this.IDandSpeArray[i]).split("|")[0];
                    _this.productArray.push(TempObj);
                });
            }
            // console.log(_this.productArray);
            // _this.speDis = parseInt(local.getItem("discount"));

            let total = 0;
            let partal = 0;
            setTimeout(() => {
                for (let i = 0; i < _this.productArray.length; i++) {
                    partal = 0;
                    partal = parseInt(_this.productArray[i].price) * parseInt(_this.productArray[i].amount);
                    // console.log(partal);
                    total += partal;
                    // console.log(total);
                }
                if (local.getItem("discount") == null) {
                    _this.totalPrice = total;
                    _this.discount_info = "輸入折扣代碼享優惠";
                } else {
                    _this.speDis = parseFloat(local.getItem("discount"));
                    _this.totalPrice = total * _this.speDis;
                    _this.discount_info = "已使用8折優惠";
                }
            }, 1000);
        },
        amountChange: function (id, size, e) {
            let _this = this;

            //放進 商品id,規格,事件本身
            var n = -1; //這個商品放在productArray的index
            for (let i = 0; i < this.productArray.length; i++) {
                //找到此商品的index並放入n
                if (this.productArray[i].productId == id) {
                    n = i;
                }
            }
            this.productArray[n].amount = parseInt(e.target.value); //更新productArray中的amount
            let local = localStorage;
            let localindex = id + "(" + size; //localstorage的key,以下更新localstorage
            _price = local.getItem(localindex).split("|")[0];
            _imgName = local.getItem(localindex).split("|")[2];
            _value = _price + "|" + this.productArray[n].amount + "|" + _imgName;
            local.removeItem(localindex);
            local.setItem(localindex, _value);
            // this.totalPrice();
            console.log(this.productArray);
            let total = 0;
            let partal = 0;
            setTimeout(() => {
                for (let i = 0; i < _this.productArray.length; i++) {
                    partal = 0;
                    partal = parseInt(_this.productArray[i].price) * parseInt(_this.productArray[i].amount);
                    total += partal;
                }
                if (local.getItem("discount") == null) {
                    _this.totalPrice = total;
                    _this.discount_info = "輸入折扣代碼享優惠";
                } else {
                    _this.speDis = parseFloat(local.getItem("discount"));
                    _this.totalPrice = total * _this.speDis;
                    _this.discount_info = "已使用8折優惠";
                }
            }, 1000);
        },
        Mydelete(id, size) {
            console.log("del");
            console.log(id + "(" + size);
            let ret = confirm("確定要刪除嗎?");
            if (ret == true) {
                let localindex = "|" + id + "(" + size;
                let localindex2 = id + "(" + size;
                TempProductList = localStorage["productList"];
                localStorage.removeItem(localindex2);
                localStorage.setItem(
                    "productList",
                    TempProductList.split(localindex)[0] + TempProductList.split(localindex)[1]
                );
                location = location;
            }
            // this.totalPrice();
        },
        orderDessert: function () {
            alert(`已收到${this.memberName}的訂單`);
            localStorage.clear();
            window.location.href = "https://localhost:7146/Home/DemoProduct";
        },
        useDiscount: function () {
            let _this = this;
            if (_this.coupon == "momo80") {
                eightyPercentOff();
            } else {
                noDiscount();
            }

            function eightyPercentOff() {
                let total = 0;
                for (let i = 0; i < _this.productArray.length; i++) {
                    partal = parseInt(_this.productArray[i].price) * parseInt(_this.productArray[i].amount);
                    total += partal;
                }
                _this.speDis = 0.8;
                local.setItem("discount", 0.8);
                _this.totalPrice = total * parseFloat(_this.speDis);
                _this.discount_info = "已使用8折優惠";
                _this.coupon = "";
            }
            function noDiscount() {
                alert("折扣代碼有誤");
                local.removeItem("discount");
                _this.coupon = "";
            }
        },
    },
});
