$('#custom').textbox({
    iconCls: 'icon-man',
    iconAlign: 'left'
})

$('#custom-btn1').linkbutton({
    iconCls: 'icon-search',
    text: '查询',
    onClick: function () {
        alert('查询')
    }
});

$('#custom-btn2').linkbutton({
    iconCls: 'icon-reload',
    text: '重置',
    onClick: function () {
        alert('重置')
    }
});

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
    id: 1,
    text: '成都市',
    children: [{
        id: 11,
        text: "青羊区"
    }, {
        id: 12,
        text: "武侯区"
    }, {
        id: 13,
        text: "青白江区"
    }, {
        id: 14,
        text: "锦江区"
    }, {
        id: 15,
        text: "天府新区"
    }, {
        id: 16,
        text: "高新西区"
    }]
}, {
    id: 2,
    text: '绵阳市',
    children: [{
        id: 21,
        text: "青羊区"
    }, {
        id: 22,
        text: "武侯区"
    }, {
        id: 23,
        text: "青白江区"
    }, {
        id: 24,
        text: "锦江区"
    }, {
        id: 25,
        text: "天府新区"
    }, {
        id: 26,
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


$('#custom-table').datagrid({
    url: '/customer/list',
    method: 'get',
    loadFilter: pagerFilter,
    pagination: true,
    pageList: [1, 2, 5, 10],
    rownumbers: true,
    toolbar: [{
        iconCls: 'icon-add',
        text: '新增客户',
        handler: addcustomer
    }],
    columns: [
        [{
                field: 'ck',
                checkbox: true
            },
            {
                field: 'name',
                title: '客户名称',
                width: 200,
                align: 'center'
            },
            {
                field: 'customerType',
                title: '客户类型',
                width: 100,
                align: 'center'
            },
            {
                field: 'industryType',
                title: '行业类型',
                width: 100,
                align: 'center'
            },
            {
                field: 'area',
                title: '所属区域',
                width: 100,
                align: 'center'
            },
            {
                field: 'validDate',
                title: '有效期',
                width: 100,
                align: 'center'
            },
            {
                field: 'basicInfo',
                title: '单位基本信息',
                width: 100,
                align: 'center'
            }
        ]
    ],

});


function addcustomer() {
    $('#custom-dd').dialog({
        title: '增加新客户',
        width: 600,
        height: 500,
        closed: false,
        cache: false,
        href: '/views/customer/custom-dialog.html',
        modal: true,
        buttons: [{
            text: '保存',
            handler: sendcustomer
        }, {
            text: '关闭',
            handler: function () {
                $('#custom-dd').dialog('close');
            }

        }]
    });
}

function sendcustomer() {
    var data = {
        name: $("#custom-name").val(),
        customerType: $("#custom-type").val(),
        manager: $("#manager-name").val(),
        tel: $("#manager-tel").val(),
        email: $("#manager-email").val(),
        industryType: $("#industry-type").val(),
        area: $("#area").val(),
        validDate: $("#validDate").val(),
        basicInfo: [$("#person-num").val(), $("#phone-num").val(), $("#circuit-num").val(), $("#optical-num").val(), $("#condition").val()].join(' ')
    };
    for (const key in data) {
        if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (element == "") {
                alert("请输入完整数据");
                return;
            }
        }
    }
    $.ajax({
        type: "POST",
        url: "/customer/add",
        data: data,
        dataType: "json",
        success: function (response) {
            if (response.code == 0) {
                alert("新增成功");
                $('#custom-table').datagrid('reload');
                $('#custom-dd').dialog('close');

            } else {
                alert("新增失败");
            }
        }
    });
}