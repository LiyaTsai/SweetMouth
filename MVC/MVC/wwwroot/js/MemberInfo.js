var webApiBaseUrl = "https://localhost:7096/";      //axios�ШD�|�e�쪺Web Api���}
var MemID = sessionStorage.getItem("MemberID")    //��X�|��ID
console.log(MemID)
alert(MemID)
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        MemberInfo: [],
        Order: [],
        BlogMessage: [],
        Schedule: [],
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
            });
            axios.get(`${webApiBaseUrl}api/Blogs`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    if (x.data[i].memberID == MemID) { _this.BlogMessage.push(x.data[i]); }
                    else { continue; }
                }
            });
        }
    },
})
