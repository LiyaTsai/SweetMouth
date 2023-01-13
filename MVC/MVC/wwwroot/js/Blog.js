var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        BlogInfo: [],
        baseUrl: "https://localhost:7146/Home/blogPage",
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
    },
    methods: {
        MakeProInfo: function () {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Blogs`).then(res => {
                _this.BlogInfo = res.data;
                let blogList = [];
                for (i = 0; i < _this.BlogInfo.length; i++) {
                    let item = {};
                    if (_this.BlogInfo[i].floor == 0) { // 樓層 = 0 發文者
                        item = _this.BlogInfo[i];
                        blogList.push(item);
                    }
                }
                _this.BlogInfo = blogList;
                console.log(_this.BlogInfo)
            })
        },
    },
})
