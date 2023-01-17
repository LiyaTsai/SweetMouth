var webApiBaseAddress = "";
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
    },
    mounted: function () {
        _this = this;
    },
    methods: {
        edit: function () {
            Edit = true;
        }
    },
})