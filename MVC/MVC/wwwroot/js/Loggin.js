/*var loginmail = document.getElementById("loginmail");*/
loginmail = $("#loginmail")                             //帳號輸入欄位
var password = document.getElementById("password");     //密碼輸入欄位
var webApiBaseUrl = "https://localhost:7096/"
forgotBtn = document.getElementById("forgotBtn");

// 登入開啟 Modal
$(window).ready(() => {
    if (sessionStorage.getItem("MemberID") == null) {
        $('#loginModal').modal('show');
    } else {
        $('#Modal-close').removeAttr('disabled');
        //$('#Modal-close').removeAttr('data-bs-keyboard');
    }
})

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
            else {
                isMem = false;
            }
        }
        if (isMem) {
            axios.get(`${webApiBaseUrl}api/Member/${sessionStorage.getItem("MemberID")}`).then(b => {
                alert(`${b.data.name}歡迎登入`);
                $("#loginModal").modal('hide');
                setTimeout(() => { location = location; }, 150)
            });
        }
        else {
            alert("帳號密碼輸入錯誤");
            $("#password").val("")
        }
    })
})

document.getElementById("email_id").addEventListener("keydown", function (e) {
    if (e.keyCode === 13) {
        forgotBtn.click();
    }
});

forgotBtn.addEventListener("click", function () {
    mail = document.getElementById("email_id").value;
    //Tempid = 0;
    const EmailPromise = new Promise((resolve, reject) => {
        axios.get(`${webApiBaseUrl}api/Member`).then(x => {
            let y = x.data;
            for (let i = 0; i < y.length; i++) {
                if (y[i].email == mail) { resolve(y[i].memberId); break; }
            }
            resolve(0)
        })
    })
    EmailPromise.then((val) => {
        if (val == 0) {
            alert("請確認此Email已註冊");
        }
        else {
            axios.get(`${webApiBaseUrl}api/Member/` + val).then(a => {
                console.log(a.data.password)
                let params = {
                    from_name: a.data.name,
                    email_id: mail,
                    message: "您的密碼是：" + a.data.password
                }
                emailjs.send('service_fxukuhb', 'template_ap40fri', params).then(function (res) {
                    alert('驗證信已成功寄出，快去看看吧');
                })
            })
        }
    })
})