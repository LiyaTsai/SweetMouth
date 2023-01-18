/*var loginmail = document.getElementById("loginmail");*/
loginmail = $("#loginmail")                             //帳號輸入欄位
var password = document.getElementById("password");     //密碼輸入欄位
var webApiBaseUrl = "https://localhost:7096/"


//var navbarCollapse = new Vue({
//    el: "#navbarCollapse",
//    name: "navbarCollapse",
//    data: {
//        MemID: 0,
//        nickName: null,
//        MemberbaseUrl: "https://localhost:7146/Home/MemberInfo",
//    },
//    mounted() {
//    },
//    methods: {
//    },
//})



logginBtn.addEventListener("click", function () {       //為登入按鈕加入事件聆聽
    axios.get(`${webApiBaseUrl}api/Member`).then(a => {
        let b = a.data;
        var isMem = false;
        cook = document.cookie.split("MemberID=")[1];      
        for (let i = 0; i < b.length; i++) {
            if ((b[i].phoneNumber == loginmail.val() || b[i].email == loginmail.val()) && b[i].password == password.value) {
                isMem = true;
                /*navbarCollapse.MemID = b[i].memberId;*/
                sessionStorage.setItem("MemberID", b[i].memberId);
                sessionStorage.setItem("nickName", b[i].nickName);
                save = document.getElementById("save");
                if (save.checked) {
                    document.cookie = `MemberID=${cook};max-age=0`;  
                    document.cookie = `MemberID=${b[i].memberId};max-age=86400`;
                }
                else {
                    console.log("cook:" + cook)
                    document.cookie = `MemberID=${cook};max-age=0`;                   
                };               
                //sessionStorage.setItem("MemberID", b[i].memberId)
                //var Id = sessionStorage.getItem("MemberID")
                //alert(`${b[i].name}歡迎登入`);
                //$("#loginModal").modal('hide');
                break;
            }
            else { isMem = false; }
        }
        if (isMem) {
            axios.get(`${webApiBaseUrl}api/Member/${sessionStorage.getItem("MemberID") }`).then(b => {
                alert(`${b.data.name}歡迎登入`);
            });
            $("#loginModal").modal('hide');
            //setTimeout(() => { location = location; },150)          
        }
        else {
            alert("帳號密碼輸入錯誤");
            $("#password").val("")
        }
    })
})
