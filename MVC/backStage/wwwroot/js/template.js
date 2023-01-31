var webApiBaseAddress = "";
thepage = window.location.href.split("?")[1];
document.getElementsByClassName("text-center my-5")[0].innerHTML = thepage + "後台"
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        p: [
            {
                id: 1,
                item1: 'item1',
                item2: 'item2',
                item3: 'item3',
            },
            {
                id: 2,
                item1: 'item1',
                item2: 'item2',
                item3: 'item3',
            },
            {
                id: 3,
                item1: 'item1',
                item2: 'item2',
                item3: 'item3',
            },
            {
                id: 4,
                item1: 'item1',
                item2: 'item2',
                item3: 'item3',
            }
        ],
        p_item: [],
        item1: null,
        item2: null,
        item3: null,
        // 容器
        item1_E: null,
        item2_E: null,
        item3_E: null,
        DataArray:[],
    },
    mounted: function () {
        _this = this;
        _this.start();
    },
    methods: {
        start: function () {
            axios.get(`https://localhost:7096/api/` + thepage).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    TempData = {}
                    TempData.memberId = x.data[i].memberId;
                    TempData.name = x.data[i].name;
                    TempData.nickName = x.data[i].nickName;
                    TempData.email = x.data[i].email;
                    TempData.phoneNumber = x.data[i].phoneNumber;
                    TempData.password = x.data[i].password;
                    this.DataArray.push(HTMLTemplateElement)
                }
            })
            setTimeout(() => { console.log(this.DataArray) },200)
        },
        edit: function (id) {
            let _this = this;
            let List = [];
            for (i = 0; i < _this.p_item.length; i++) {
                let item = {}
                item = _this.p_item[i]
                if (id == _this.p_item[i].id) {
                    item.Edit = true;
                    _this.item1_E = item.item1;
                    _this.item2_E = item.item2;
                    _this.item3_E = item.item3;
                } else {
                    item.Edit = false;
                }
                List.push(item);
            }
            _this.p_item = List;
        },
        cancel: function () {
            let _this = this;
            let List = [];
            for (i = 0; i < _this.p_item.length; i++) {
                let item = {}
                item = _this.p_item[i]
                if (item.Edit == true) {
                    item.Edit = false;
                    item.item1 = _this.item1_E;
                    item.item2 = _this.item2_E;
                    item.item3 = _this.item3_E;
                }
                List.push(item);
            }
            _this.p_item = List;
        },
        showModal: function () {
            $("#insertModal").modal('show');
        },
        delete: function (id) {
            console.log(id)
            // let _this = this;
            // var ret = confirm("確定要刪除嗎?");
            // if (ret == true) {

            //     _this.start();
            // }
        },
    },
})