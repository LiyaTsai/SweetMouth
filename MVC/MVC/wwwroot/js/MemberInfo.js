var webApiBaseUrl = "https://localhost:7096/";      //axios連線route
var MemID = (document.cookie.indexOf("MemberID") == -1) ? sessionStorage.getItem("MemberID") : document.cookie.split("MemberID=")[1].split(";")[0];
//儲存好的MemberID，如果cookie有，就從cookie抓，否則抓session
console.log(document.cookie.indexOf("MemberID") == -1)
console.log("MemID=" + MemID)
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        MemberInfo: [],
        Order: [],
        BlogMessage: [],
        OrderMessage: [],
        Schedule: [],
        Birth: null,
        ClassInformation: [],
        Edit: true,
        isEditNick: true,
        isEditEmail: true,
        isEditPhone: true,
        isEditBirth: true,
    },
    mounted() {
        _this = this;
        _this.LogMem();
    },
    methods: {
        LogMem: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Member/` + MemID).then(a => {
                _this.MemberInfo = a.data;
                dat = a.data.birthday;
                _this.Birth = dat.split("T")[0];
            });
            axios.get(`${webApiBaseUrl}api/Blogs`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    if (x.data[i].memberID == MemID) {
                        _this.BlogMessage.push(x.data[i]);
                    }
                    else { continue; }
                }
            });
            axios.get(`${webApiBaseUrl}api/Order`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    if (x.data[i].memberId == MemID) {
                        _this.OrderMessage.push(x.data[i]);
                    }
                    else { continue; }
                }
            })
        },
        ClickToArticle: function (e) {
            window.location.assign("https://localhost:7146/Home/blogPage?id=" + e.target.value)
        },
        EditName: function () {
            if (this.Edit) {
                this.Edit = false;
                var name = this.MemberInfo.name
                setTimeout(function () {
                    let nameInput = document.getElementById("nameInput");
                    nameInput.value = name;
                    nameInput.focus();
                }, 10);
            }
            else {
                let nameInput = document.getElementById("nameInput");
                if (nameInput.value != "") {
                    var conf = confirm(`確定要變更為${nameInput.value}嗎?`)
                    if (conf) {
                        var TempPut = {};
                        TempPut.memberID = MemID;
                        TempPut.name = nameInput.value;
                        TempPut.nickName = this.MemberInfo.nickName;
                        TempPut.email = this.MemberInfo.email;
                        TempPut.password = this.MemberInfo.password
                        TempPut.phoneNumber = this.MemberInfo.phoneNumber;
                        TempPut.birthDay = this.MemberInfo.birthday;
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.Edit = true;
                        this.EditName();
                    }, 100);
                }
                setTimeout(() => {
                    this.Edit = true;
                    this.LogMem();
                }, 100);
            }
        },
        EditNick: function () {
            if (this.isEditNick) {
                this.isEditNick = false;
                var Nickname = this.MemberInfo.nickName
                setTimeout(function () {
                    let nameInput = document.getElementById("nickNameInput");
                    nameInput.value = Nickname;
                    nameInput.focus();
                }, 10);
            }
            else {
                let nameInput = document.getElementById("nickNameInput");
                if (nameInput.value != "") {
                    var conf = confirm(`確定要變更為${nickNameInput.value}嗎?`)
                    if (conf) {
                        var TempPut = {};
                        TempPut.memberID = MemID;
                        TempPut.password = this.MemberInfo.password
                        TempPut.name = this.MemberInfo.name;
                        TempPut.nickName = nickNameInput.value;
                        TempPut.email = this.MemberInfo.email;
                        TempPut.phoneNumber = this.MemberInfo.phoneNumber;
                        TempPut.birthDay = this.MemberInfo.birthday;
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.isEditNick = true;
                        this.EditNick();
                    }, 100);
                }
                setTimeout(() => {
                    this.isEditNick = true;
                    this.LogMem();
                }, 100);
            }
        },
        EditEmail: function () {
            if (this.isEditEmail) {
                this.isEditEmail = false;
                var Email = this.MemberInfo.email
                setTimeout(function () {
                    let Input = document.getElementById("EmailInput");
                    Input.value = Email;
                    Input.focus();
                }, 10);
            }
            else {
                let Input = document.getElementById("EmailInput");
                if (Input.value != "") {
                    var conf = confirm(`確定要變更為${Input.value}嗎?`)
                    if (conf) {
                        var TempPut = {};
                        TempPut.memberID = MemID;
                        TempPut.password = this.MemberInfo.password
                        TempPut.name = this.MemberInfo.name;
                        TempPut.nickName = this.MemberInfo.nickName;
                        TempPut.email = Input.value;
                        TempPut.phoneNumber = this.MemberInfo.phoneNumber;
                        TempPut.birthDay = this.MemberInfo.birthday;
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.isEditEmail = true;
                        this.EditEmail();
                    }, 100);
                }
                setTimeout(() => {
                    this.isEditEmail = true;
                    this.LogMem();
                }, 100);
            }
        },
        EditPhone: function () {
            if (this.isEditPhone) {
                this.isEditPhone = false;
                var Val = this.MemberInfo.phoneNumber
                setTimeout(function () {
                    let Input = document.getElementById("PhoneInput");
                    Input.value = Val;
                    Input.focus();
                }, 10);
            }
            else {
                let Input = document.getElementById("PhoneInput");
                if (Input.value != "") {
                    var conf = confirm(`確定要變更為${Input.value}嗎?`)
                    if (conf) {
                        var TempPut = {};
                        TempPut.memberID = MemID;
                        TempPut.name = this.MemberInfo.name;
                        TempPut.nickName = this.MemberInfo.nickName;
                        TempPut.email = this.MemberInfo.phoneNumber;
                        TempPut.phoneNumber = Input.value;
                        TempPut.birthDay = this.MemberInfo.birthday;
                        TempPut.password = this.MemberInfo.password;
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.isEditPhone = true;
                        this.EditPhone();
                    }, 100);
                }
                setTimeout(() => {
                    this.isEditPhone = true;
                    this.LogMem();
                }, 100);
            }
        },
        EditBirth: function () {
            if (this.isEditBirth) {
                this.isEditBirth = false;
                console.log(this.MemberInfo)
                var Val = this.Birth;
                setTimeout(function () {
                    let Input = document.getElementById("BirthInput");
                    Input.value = Val;
                    Input.focus();
                }, 10);
            }
            else {
                let Input = document.getElementById("BirthInput");
                if (Input.value != "") {
                    var conf = confirm(`確定要變更為${Input.value}嗎?`)
                    if (conf) {
                        var TempPut = {};
                        TempPut.memberID = MemID;

                        TempPut.name = this.MemberInfo.name;
                        TempPut.nickName = this.MemberInfo.nickName;
                        TempPut.email = this.MemberInfo.phoneNumber;
                        TempPut.phoneNumber = this.MemberInfo.phoneNumber;
                        TempPut.birthDay = Input.value + "T00:00:00.446Z";
                        console.log(TempPut.birthDay);
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.isEditBirth = true;
                        this.EditBirth();
                    }, 100);
                }
                setTimeout(() => {
                    this.isEditBirth = true;
                    this.LogMem();
                }, 100);
            }
        },
        Cancel: function () {
            this.Edit = true;
            this.isEditNick = true;
            this.isEditEmail = true;
            this.isEditPhone = true;
            this.isEditBirth = true;
            this.LogMem();
        }
    },
})
