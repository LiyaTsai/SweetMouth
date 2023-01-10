var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        BlogInfo: [],
        Blogpage: {},
    },
    mounted() {
        _this = this;
        _this.MakeProInfo();
    },
    methods: {
        MakeProInfo: function () {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Blogs`).then(response => {
                _this.BlogInfo = response.data;
                let blogList = [];
                for (let i = 0; i < _this.BlogInfo.length; i++) {
                    let item = {};
                    if (_this.BlogInfo[i].floor == 0) {
                        item = _this.BlogInfo[i];
                        blogList.push(item);
                    }
                }
                _this.BlogInfo = blogList;
                console.log(_this.BlogInfo)
            })
        },
        locationPage: function (item) {
            let _this = this;
            axios.get(`${webApiBaseUri}api/Blogs/${item.articleID}/0`).then(response => {
                let item = response.data;
            })
            _this.Blogpage = item;
            //window.location = "/Home/blogPage"
            console.log(_this.Blogpage)
        },
    },
})
