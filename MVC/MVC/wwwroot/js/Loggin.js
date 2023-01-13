
/*var loginmail = document.getElementById("loginmail");*/
loginmail = $("#loginmail")                             //帳號輸入欄位
var password = document.getElementById("password");     //密碼輸入欄位
var webApiBaseUrl = "https://localhost:7096/"

var navbarCollapse = new Vue({
    el: "#navbarCollapse",
    name: "navbarCollapse",
    data: {
        MemID: 0,
        MemberbaseUrl: "https://localhost:7146/Home/MemberInfo",
    },
    mounted() {
    },
    methods: {
    },
})



logginBtn.addEventListener("click", function () {       //為登入按鈕加入事件聆聽
    axios.get(`${webApiBaseUrl}api/Member`).then(a => {
        let b = a.data;
        for (let i = 0; i < b.length; i++) {
            if ((b[i].phoneNumber == loginmail.val() || b[i].email == loginmail.val()) && b[i].password == password.value) {
                sessionStorage.setItem("MemberID", b[i].memberId)
                var Id = sessionStorage.getItem("MemberID")
                alert(`${b[i].name}歡迎登入`);
                $("#loginModal").modal('hide');
            }
            //else {
            //    alert("帳號密碼錯誤");
            //    break;
            //    $("#loginModal").modal('hide');
            //}                      
        }
    })
    navbarCollapse.MemID = sessionStorage.getItem("MemberID")
})



