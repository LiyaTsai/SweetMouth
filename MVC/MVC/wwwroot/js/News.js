var webApiBaseUrl = "https://localhost:7096/";  //先把前面的路徑寫起來以後換機改這就好
var articleID = window.location.search
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        title: null,
        author: null,
        time: null,
        article: null,
        floors: [],
        articlePoster: [],
    },
    mounted() {
        _this = this;
        _this.LogFloor();
    },
    methods: {
        LogFloor: function () {
            let _this = this;
            axios.get(`${webApiBaseUrl}api/Blogs`).then(a => {
                for (let i = 0; i < a.data.length; i++) {
                    if (a.data[i].articleID == articleID.split("=")[1]) {
                        if (a.data[i].floor == 0) { _this.articlePoster.push(a.data[i]) }
                        else {
                            console.log(a.data[i]);
                            _this.floors.push(a.data[i]);
                        }
                    }
                    else { continue; }
                }
                console.log(_this.floors)
            });
            console.log(articleID.split("=")[1])
        },
    },
})



