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
        Size: null,
        Flavor: null,
        Price: null,
        Avalible: false,
        Tag: null,
        Category: null,
        NewImage:null,
    },
    mounted: function () {
        _this = this;
        _this.start();
    },
    methods: {
        start: function () {
            let _this = this;
            
            let List = [];
            axios.get(`https://localhost:7096/api/Product`).then(x => {
                for (let i = 0; i < x.data.length; i++) {
                    List.push(x.data[i]);
                }
            })
            _this.p_item = List;
        },
        edit: function (id) {
            let _this = this;
            let List = [];
            console.log(id)
            for (i = 0; i < _this.p_item.length; i++) {
                let item = {}
                item = _this.p_item[i]
                if (id == _this.p_item[i].memberId) {
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
        Mydelete: function (id) {
            console.log(id);
            var ret = confirm("確定要刪除嗎?");
            if (ret) {
                axios.delete(`https://localhost:7096/api/Product/${id}`).then(response => {
                    alert(response.data);
                    location = location;
                });
            }
        },
        revise: function (ii) {
            let index = this.p_item.indexOf(ii);
            id = this.p_item[index].productId;
            console.log(this.p_item[index])
            console.log(ii)
            let TempObj = {}
            TempObj.productId = ii.productId;
            TempObj.productName = ii.productName;
            TempObj.size = ii.size;
            TempObj.flavor = ii.flavor;
            TempObj.price = ii.price;
            TempObj.tag = ii.tag;
            TempObj.category = ii.category;
            TempObj.avalible = ii.avalible;

            TempObj.imageName = ii.imageName;            
            TempObj.description = ii.description;
            TempObj.tagArray = [];
            console.log(TempObj)
            axios.put(`https://localhost:7096/api/Product/` + id, TempObj).then(a => {
                alert("修改成功");
                location = location;
            })                      
        },
        Create: function () {
            TheFile = document.getElementById("NewFile");
            let Temp = {};
            Temp.productName = this.Name;
            Temp.size = this.Size;
            Temp.flavor = this.Flavor;
            Temp.price = this.Price;
            Temp.avalible = this.Avalible;
            Temp.tag = this.Tag;
            Temp.category = this.Category;           
            //console.log(Temp)
            //console.log(this.NewImage)
            //console.log(TheFile.files[0])
            len = this.NewImage.split("\\").length
            Temp.imageName = this.NewImage.split("\\")[len - 1]
            //console.log(this.NewImage.split("\\")[len-1])
            //console.log(Temp)
            Temp.productId = 0;
            Temp.description = "";
            Temp.tagArray = [];
            console.log(Temp)
            axios.post(`https://localhost:7096/api/Product`, Temp).then(x => {
                alert("新增成功");
                location = location;
            })
        },
        FillIn: function () {
            this.Name = "酷玩青檸酒凍塔";
            this.Size= "3入";
            this.Flavor = "檸檬口味";
            this.Price = "400";
            this.Avalible = true;
            this.Tag = "檸檬|含酒";
            this.Category = "常備品項";
        },
    },
})