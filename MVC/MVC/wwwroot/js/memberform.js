var webApiBaseUrl = "https://localhost:7096/";  //����e�������|�g�_�ӥH�ᴫ����o�N�n
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
        memberId:null,
    },
    mounted() {

    },
    methods: {
        PostNewMember: function () {
            let _this = this;
            var TempObj = {};
            if (_this.email == '' || _this.password == '' || _this.CheckPass == '' ||
                _this.name == '' || _this.nickName == '' || _this.phoneNumber == '' || _this.birthDay == '') {
                alert("�Фůd��");
            }
            else if (_this.CheckPass != _this.password) { alert("�T�{�K�X��J���~") }
            else
            {
                TempObj.email = _this.email;
                TempObj.password = _this.password;
                TempObj.name = _this.name;
                TempObj.nickName = _this.nickName;
                TempObj.phoneNumber = _this.phoneNumber;
                TempObj.birthDay = _this.birthDay;
                axios.post(webApiBaseUrl + 'api/Member', TempObj).then(x => {
                    alert("Seccess");
                    window.location = '/Home/product';
                })
                axios.get(webApiBaseUrl + 'api/Member').where(y => {
                    y.email = _this.email;
                    y.phoneNumber = _this.phoneNumber;
                }).then(z => _this.memberId = z.memberId)

            }

        },
    },
})


