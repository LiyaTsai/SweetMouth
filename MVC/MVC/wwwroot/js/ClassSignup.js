var webApiBaseUri = "https://localhost:7096/";
//var appVue = new Vue({
//    el: "#appVue",
//    name: "appVue",
//    data: {
//        articlePostNum: [],
//    },
//    mounted() {
//        _this = this;
//        _this.LogAricleID();
//    },
//    methods: {
//        LogAricleID: function () {
//            let _this = this;
//            axios.get(`${webApiBaseUrl}api/Schedules`).then(res => {
//                _this.articlePostNum = res.data;
//                console.log(_this.articlePostNum)
//                //for (let i = 0; i < res.data.length; i++) {
//                //    _this.articlePostNum = res.data[i].articleID;
//                //}
//            });

//        },
//        PostNewBlog: function () {
//            //if (sessionStorage.getItem("MemberID") == null) {
//            //    alert("請先登入會員")
//            //} else {
//            //    let _this = this;
//            //    let request = {};
//            //    let Time = new Date();

//            //    request.articleID = _this.articlePostNum += 1;
//            //    //console.log(_this.articlePostNum)
//            //    request.memberID = sessionStorage.getItem("MemberID");
//            //    request.productID = 10001;
//            //    request.time = Time;
//            //    request.ClassName = 'newPostblog'; // 預設圖片
//            //    request.title = _this.Title;
//            //    request.SubTitle = _this.SubTitle;
//            //    request.Article = _this.article;
//            //    axios.post(`${webApiBaseUri}api/Schedules`, request).then(res => {
//            //        alert("報名成功")
//            //        window.location = "/Home/Blog"
//            //    })
//            }
//        },
//    },
//})
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        peoNum: null,
    },
    mounted() {
        _this = this;
    },
    methods: {
        postClass: function () {
            let request = {};
            let Time = new Date();

            request.date = Time;
            request.memberId = 99008;
            request.productID = 10001;
            request.className = "777";
            request.peopleNumber = _this.peoNum;
            request.note = "77777";
            axios.post(`${webApiBaseUri}api/Schedules`,request).then(res => {
                alert("報名成功")

            })
        },
    },
})




