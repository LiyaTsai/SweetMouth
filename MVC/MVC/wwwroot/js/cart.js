let local = localStorage;
var webApiBaseUrl = "https://localhost:7096/"; 
var MemID = (document.cookie.indexOf("MemberID") == -1) ? sessionStorage.getItem("MemberID") : document.cookie.split("MemberID=")[1].split(";")[0];

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        IDandSpeArray: [],
        productArray: [],
        AmountArray: [],
        ImgArray: [],
        NameArray: [],
        FlavorArray:[],
        price: "",
        flavor: "",
        size: "",
        imageName: "",
        memberName: "",
        memberPhone: "",
        memberAddress:"",
    },
    mounted() {
        let _this = this;
        _this.getProduct();
    },
    methods: {
        getProduct() {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Member/` + MemID).then(a => {
                _this.memberName = a.data.name;
                _this.memberPhone = a.data.phoneNumber;
                _this.memberAddress = a.data.address;
            });
            for (let i = 1; i < local.getItem("productList").split("|").length; i++)
            {
                _this.IDandSpeArray.push(local.getItem("productList").split("|")[i]);
            }
            _this.IDandSpeArray = _this.IDandSpeArray.sort();
            for (let i = 0; i < _this.IDandSpeArray.length; i++) {
                TempID = _this.IDandSpeArray[i].split("(")[0]
                axios.get(`${webApiBaseUrl}api/Product/${TempID}`).then(x => {
                    TempObj = {}
                    TempObj = x.data;
                    TempObj.size = _this.IDandSpeArray[i].split("(")[1]
                    TempObj.amount = local.getItem(_this.IDandSpeArray[i]).split("|")[1]
                    _this.productArray.push(TempObj)
                })
            }
            console.log(_this.productArray)
        },
    },
});