﻿var webApiBaseUri = "https://localhost:7096/";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        BlogInfo: [],
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
            })
        },
    },
})




