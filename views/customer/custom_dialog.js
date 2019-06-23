
$("#custom-type").combobox({
    // required: true,
    valueField: 'id',
    textField: 'text',
    width: 160,
    editable: false,
    panelHeight: 'auto',
    data: [{
        id: 1,
        text: '一般客户'
    }, {
        id: 2,
        text: '重点客户'
    }]
});
$("#industry-type").combobox({
    valueField: 'id',
    textField: 'text',
    width: 160,
    panelHeight: 'auto',
    editable: false,
    data: [{
        id: 1,
        text: '商业银行'
    }, {
        id: 2,
        text: '企业'
    }]
});

var areaData = [{
    id: '成都市',
    text: '成都市',
    children: [{
        id: "青羊区",
        text: "青羊区"
    }, {
        id: "武侯区",
        text: "武侯区"
    }, {
        id: "青白江区",
        text: "青白江区"
    }, {
        id: "锦江区",
        text: "锦江区"
    }, {
        id: "天府新区",
        text: "天府新区"
    }, {
        id: "高新西区",
        text: "高新西区"
    }]
}, {
    id: '绵阳市',
    text: '绵阳市',
    children: [{
        id: "青羊区",
        text: "青羊区"
    }, {
        id: "武侯区",
        text: "武侯区"
    }, {
        id: "青白江区",
        text: "青白江区"
    }, {
        id: "锦江区",
        text: "锦江区"
    }, {
        id: "天府新区",
        text: "天府新区"
    }, {
        id: "高新西区",
        text: "高新西区"
    }]
}];

$("#area").combotree({
    valueField: 'id',
    textField: 'text',
    width: 160,
    
    editable: false,
});

$("#area").combotree('loadData', areaData);
$("#validDate").datebox({
    required: true,
    width: 160,
    editable: false,
    formatter: function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        return y + '-' + m + '-' + d;
    },
});
$('#validDate').datebox('calendar').calendar({
    validator: function (date) {
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return today <= date;
    }
});