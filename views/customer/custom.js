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
    },{
        iconCls: 'icon-cancel',
        text: '删除客户',
        handler: deletecustomer
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
                align: 'center',
                formatter: function (row) {
                    if (row == 1) {
                        return '一般客户';
                    } else {
                        return '重点客户';
                    }
                }
            },
            {
                field: 'industryType',
                title: '行业类型',
                width: 100,
                align: 'center',
                formatter: function (row) {
                    if (row == 1) {
                        return '商业银行';
                    } else {
                        return '企业';
                    }
                }
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
            },
            {
                field: 'actions',
                title: '操作',
                width: 100,
                align: 'center',
                formatter: function (value, row) {
                    var rowString = row._id;
                    return `<button class="easyui-linkbutton" data-options="iconCls:'icon-add'" onclick='exam("${rowString}")'>发起审批</button>`
                
                }

            }
        ]
    ],

    onLoadSuccess: function(){
        $.parser.parse();
    }
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


function deletecustomer() {
    confirm("确认要删除吗？");
    var value = $('#custom-table').datagrid('getChecked');
    if (value.length == 0) {
        alert("请选中要删除的数据");
        return;
    }
    var id = [];
    for (const iterator of value) {
        id.push(iterator._id);
    }
    $.ajax({
        type: "delete",
        url: "/customer/delete",
        data: {
            _id: id
        },
        success: function (response) {
            if (response.code == 0) {
                $('#custom-table').datagrid('reload');
                alert("删除成功！");
            } else {
                alert("删除失败！");
            }
        }
    });

}

function exam(id) {
    sessionStorage.setItem('id', id);
    if ($('#page').tabs('exists', '发起审批')){
        alert("你有未完成事务");
        $('#page').tabs('select', '发起审批');
    }else{
        $('#page').tabs('add', {
            title: '发起审批',
            href: `/project`,
            closable:true,
            selected: true,
        });
    } 
    
    
}