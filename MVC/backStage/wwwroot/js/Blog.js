var webApiBaseAddress = "";
var appVue = new Vue({
    el: "#appVue",
    name: "appVue",
    data: {
        p_item: [],
        item1: null,
        item2: null,
        item3: null,
        Name: null,
        Floor: null,
        Title: null,
        Time: null,
    },
    mounted: function () {
        _this = this;
        _this.start();
    },
    methods: {
        start: function () {
            let _this = this;
            
            let List = [];
            axios.get(`https://localhost:7096/api/Blogs`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    List.push(x.data[i]);
                }
            })
            _this.p_item = List;
            console.log(_this.p_item)
        },
        edit: function (id,flo) {
            let _this = this;
            let List = [];
            for (i = 0; i < _this.p_item.length; i++) {
                let item = {}
                item = _this.p_item[i]
                if (id == _this.p_item[i].articleID && flo==_this.p_item[i].floor) {
                    item.Edit = true;
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
                }
                List.push(item);
            }
            _this.p_item = List;
            location = location
        },
        showModal: function () {
            $("#insertModal").modal('show');
        },
        delete: function (id) {
            console.log(id)
        },
        revise: function (ii) {
            let index = this.p_item.indexOf(ii);
            id = this.p_item[index].articleID;
            let TempObj = {}
            TempObj.articleID = ii.articleID;
            TempObj.floor = ii.floor;
            TempObj.memberName = ii.memberName;
            TempObj.title = ii.title;
            TempObj.time = ii.time;

            TempObj.memberID = ii.memberID;
            TempObj.nickName = ii.nickName;
            TempObj.subTitle = ii.subTitle;
            TempObj.article = ii.article;
            TempObj.imageName = ii.imageName;
            TempObj.productID = ii.productID;
            TempObj.tag = ii.tag;
            TempObj.productImageName = ii.productImageName
            console.log(TempObj)
            axios.put(`https://localhost:7096/api/Blogs/` + ii.articleID + ii.floor, TempObj).then(a => {
                alert("修改成功")
                //location = location
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