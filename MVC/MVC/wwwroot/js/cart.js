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
            console.log(_this.productArray);
        },
        amountChange: function (id,size,e) {    //放進 商品id,規格,事件本身
            var n = -1;                         //這個商品放在productArray的index
            for (let i = 0; i < this.productArray.length; i++) {    //找到此商品的index並放入n
                if (this.productArray[i].productId == id) {n=i }
            }
            this.productArray[n].amount = parseInt(e.target.value)  //更新productArray中的amount
            let local = localStorage;           
            let localindex = id + "(" + size    //localstorage的key,以下更新localstorage
            _price = local.getItem(localindex).split("|")[0];
            _imgName = local.getItem(localindex).split("|")[2];
            _value = _price + "|" + this.productArray[n].amount + "|" + _imgName;
            local.removeItem(localindex);
            local.setItem(localindex, _value);           
        },
    },
});
