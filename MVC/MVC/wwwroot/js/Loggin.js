
/*var loginmail = document.getElementById("loginmail");*/
loginmail = $("#loginmail")
var password = document.getElementById("password");
var webApiBaseUrl = "https://localhost:7096/"
logginBtn.addEventListener("click", function () {
    axios.get(`${webApiBaseUrl}api/Member`).then(a => {
        let b = a.data;
        for (let i = 0; i < b.length; i++) {
            if ((b[i].phoneNumber == loginmail.val() || b[i].email == loginmail.val()) && b[i].password == password.value)
            {
                alert(`${b[i].name}歡迎登入`);
                sessionStorage.setItem("MemberID", b[i].memberId)
            };
            $("#loginModal").modal('hide');
        }
    })







})



