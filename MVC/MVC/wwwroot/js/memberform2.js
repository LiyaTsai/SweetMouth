var webApiBaseUrl = "https://localhost:7096/";  //先把前面的路徑寫起來以後換機改這就好
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        email: null,
        password: null,
        CheckPass: null,
        name: null,
        nickName: null,
        phoneNumber: null,
        birthDay: null,
        memberId: null,
    },
    mounted() {

    },
    methods: {
        PostNewMember: function () {
            let _this = this;
            var TempObj = {};
            if (_this.email == '' || _this.password == '' || _this.CheckPass == '' ||
                _this.name == '' || _this.nickName == '' || _this.phoneNumber == '' || _this.birthDay == '') {
                alert("請勿留空");
            }
            else if (_this.CheckPass != _this.password) { alert("確認密碼輸入錯誤") }
            else {
                TempObj.email = _this.email;
                TempObj.password = _this.password;
                TempObj.name = _this.name;
                TempObj.nickName = _this.nickName;
                TempObj.phoneNumber = _this.phoneNumber;
                TempObj.birthDay = _this.birthDay;
                axios.post(webApiBaseUrl + 'api/Member', TempObj).then(x => {
                    alert("Seccess");
                    window.location = '/Home/DemoProduct';
                });
                axios.get(webApiBaseUrl + 'api/Member')
                    .where(y => {
                        y.email = _this.email;
                        y.phoneNumber = _this.phoneNumber;
                    })
                    .then(z => { _this.memberId = z.memberId })
            }
        },
        MakeNewData: function () {
            //console.log(this.email);
            //console.log(this.password);
            //console.log(this.CheckPass);
            //console.log(this.name);
            //console.log(this.nickName);
            //console.log(this.phoneNumber);
            //console.log(this.birthDay);
            this.email = "ThisIsTest@gmail.com";
            this.password = "18000000";
            this.CheckPass = "18000000";
            this.name = "你好我是測試人員";
            this.nickName = "小測";
            this.phoneNumber = "0955555555";
            this.birthDay = "1900-11-05";
        },
    },
})



