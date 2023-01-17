<<<<<<< HEAD
=======
var webApiBaseUrl = "https://localhost:7096/";      //axios連線route
var MemID = (document.cookie.indexOf("MemberID") == -1) ? sessionStorage.getItem("MemberID") : document.cookie.split("MemberID=")[1].split(";")[0];
//儲存好的MemberID，如果cookie有，就從cookie抓，否則抓session
console.log(document.cookie);
console.log(document.cookie.indexOf("MemberiD"))
console.log(document.cookie.split("MemberID=")[1].split(";")[0])
console.log(MemID)

var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        MemberInfo: [],
        Order: [],
        BlogMessage: [],
        Schedule: [],
        Edit: true,
        Birth: null,
        ClassInformation:[],
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
                dat = a.data.birthDay;
                _this.Birth = dat.split("T")[0];
                console.log(_this.MemberInfo);
            });
            axios.get(`${webApiBaseUrl}api/Blogs`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    if (x.data[i].memberID == MemID) {
                        _this.BlogMessage.push(x.data[i]);                       
                    }
                    else { continue; }
                }
            });
        },
        ClickToArticle: function (e) {
            window.location.assign("https://localhost:7146/Home/blogPage?id=" + e.target.value)
        },
        EditInfo: function (par) {
            console.log(this.MemberInfo)
            console.log(par)
            console.log(typeof par)
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
                        TempPut.phoneNumber = this.MemberInfo.phoneNumber;
                        TempPut.birthDay = this.MemberInfo.birthDay;
                        axios.put(`${webApiBaseUrl}api/Member/` + MemID, TempPut)
                    }
                }
                else {
                    setTimeout(() => {
                        alert("請勿輸入空白")
                        this.Edit = true;
                        this.EditInfo();
                    }, 100);
                }
                setTimeout(() => {
                    this.Edit = true;
                    this.LogMem();
                }, 100);
            }
        },
        Cancel: function () {
            this.Edit = true;
            this.LogMem();
        }
    },
})
>>>>>>> Development
