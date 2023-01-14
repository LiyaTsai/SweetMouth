var webApiBaseUrl = "https://localhost:7096/";      //axios�ШD�|�e�쪺Web Api���}
var MemID = sessionStorage.getItem("MemberID")    //��X�|��ID
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        MemberInfo: [],
        Order: [],
        BlogMessage: [],
        Schedule: [],
        Edit: true,
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
            });
            axios.get(`${webApiBaseUrl}api/Blogs`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    if (x.data[i].memberID == MemID) { _this.BlogMessage.push(x.data[i]); }
                    else { continue; }
                }
                //console.log(_this.BlogMessage)
                //console.log(JSON.stringify(_this.BlogMessage))
                //console.log(JSON.parse(JSON.stringify(_this.BlogMessage)))
                //_this.BlogMessage = JSON.stringify(_this.BlogMessage)
                //console.log(_this.BlogMessage)
            });
            //console.log(_this.BlogMessage)
            //console.log(JSON.stringify(_this.BlogMessage))
            //console.log(JSON.parse(JSON.stringify(_this.BlogMessage)))
        },
        ClickToArticle: function (e) {
            //console.log(JSON.parse(JSON.stringify(_this.BlogMessage)))
            //let Blog = JSON.parse(JSON.stringify(_this.BlogMessage));
            //let id = 0;
            //console.log(e.target)
            //console.log(e.target.value)
            //for (let i = 0; i < Blog.length; i++) {
            //    id = (Blog[i].article ==) ? Blog[i].articleID : 0;
            //}
            window.location.assign("https://localhost:7146/Home/blogPage?id=" + e.target.value)
        },
        EditInfo: function (e) {
            let nameInput = document.getElementById("nameInput")
            if (this.Edit) {
                this.Edit = false;
                console.log(e.target.getElementByTagName(''))
            }
            else {




                this.Edit = true;
            }
        },
    },
})
