//setTimeout(() => {
//    $('.table').dataTable({
//        fixedHeader: {
//            header: true,
//        },
//        language: {
//            // 搜尋 dataTables i18n
//            url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/zh-HANT.json'
//        }
//    });
    
//}, 250)

var webApiBaseAddress = "";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        //p: [
        //    {
        //        id: 1,
        //        item1: 'item1',
        //        item2: 'item2',
        //        item3: 'item3',
        //    },
        //    {
        //        id: 2,
        //        item1: 'item1',
        //        item2: 'item2',
        //        item3: 'item3',
        //    },
        //    {
        //        id: 3,
        //        item1: 'item1',
        //        item2: 'item2',
        //        item3: 'item3',
        //    },
        //    {
        //        id: 4,
        //        item1: 'item1',
        //        item2: 'item2',
        //        item3: 'item3',
        //    }
        //],
        p_item: [],
        item1: null,
        item2: null,
        item3: null,
        // 容器
        //item1_E: null,
        //item2_E: null,
        //item3_E: null,
        Name: null,
        NickName: null,
        Email: null,
        Phone: null,
        Password:null,
    },
    mounted: function () {
        _this = this;
        _this.start();
    },
    methods: {
        start: function () {
            let _this = this;
            
            let List = [];
            //for (i = 0; i < _this.p.length; i++) {
            //    let item = {}
            //    item = _this.p[i]
            //    List.push(item)
            //}
            axios.get(`https://localhost:7096/api/Member`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    List.push(x.data[i]);
                }
            })
            console.log(List)
            _this.p_item = List;
            console.log(_this.p)
            console.log(_this.p_item)
        },
        edit: function (id) {
            let _this = this;
            let List = [];
            //let index = this.p_item.indexOf(ii);
            //let id = this.p_item[index].memberId;
            //console.log(this.p_item[index].edit)
            //this.p_item[index].edit = false;
            //console.log(this.p_item[index].edit)
            console.log(id)
            for (i = 0; i < _this.p_item.length; i++) {
                let item = {}
                item = _this.p_item[i]
                if (id == _this.p_item[i].memberId) {
                    item.Edit = true;
                    //_this.item1_E = item.item1;
                    //_this.item2_E = item.item2;
                    //_this.item3_E = item.item3;
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
                    //item.item1 = _this.item1_E;
                    //item.item2 = _this.item2_E;
                    //item.item3 = _this.item3_E;
                }
                List.push(item);
            }
            _this.p_item = List;
            location = location
            //_this.start();
        },
        showModal: function () {
            $("#insertModal").modal('show');
        },
        delete: function (id) {
            console.log(id)
        },
        revise: function (ii) {
            let index = this.p_item.indexOf(ii);
            id = this.p_item[index].memberId;
            console.log(this.p_item[index])
            console.log(ii)
            let TempObj = {}
            TempObj.memberID = ii.memberId;
            TempObj.name = ii.name;
            TempObj.nickName = ii.nickName;
            TempObj.email = ii.email;
            TempObj.phoneNumber = ii.phoneNumber;
            TempObj.password = ii.password;
            TempObj.birthDay = ii.birthday;
            TempObj.favoriteProduct = ii.favoriteProduct;
            TempObj.orderID = ii.order;
            console.log(TempObj)
            axios.put(`https://localhost:7096/api/Member/` + id, TempObj).then(a => {
                //this.start();
                alert("修改成功")
                location = location
                //console.log(table.page());
            })                      
        },
        Create: function () {
            let Temp = {}
            Temp.name = this.Name;
            Temp.nickName = this.NickName;
            Temp.email = this.Email;
            Temp.phoneNumber = Phone;
            Temp.password = Password;
        },
    },
})
//Promise((resolve, reject) => {
//    resolve(appVue.p_item);
//}).then(() => {
//    $('.table').dataTable({
//        fixedHeader: {
//            header: true,
//        },
//        language: {
//            // 搜尋 dataTables i18n
//            url: 'https://cdn.datatables.net/plug-ins/1.13.1/i18n/zh-HANT.json'
//        }
//    });
//})