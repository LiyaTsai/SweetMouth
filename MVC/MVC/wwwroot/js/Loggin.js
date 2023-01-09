
/*var loginmail = document.getElementById("loginmail");*/
loginmail = $("#loginmail")
var password = document.getElementById("password");
var webApiBaseUri = "https://localhost:7096/"
logginBtn.addEventListener("click", function () {
 //   console.log(loginmail.val())
	//console.log(password.value)
    axios.get(`${webApiBaseUri}api/Member`).then(a => {
        let b = a.data;
        for (let i = 0; i < b.length; i++) {
            if ((b[i].phoneNumber == loginmail.val() || b[i].email == loginmail.val()) && b[i].password == password.value)
            { alert(`${b[i].name}歡迎登入`) };
            $("#loginModal").modal('hide');
        }
    })
})



