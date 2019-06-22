$('#user').textbox({
    iconCls: 'icon-man',
    iconAlign: 'left'
})

$('#user-btn1').linkbutton({
    iconCls: 'icon-search',
    text: '查询',
    onClick: function () {
        alert('查询')
    }
});

$('#user-btn2').linkbutton({
    iconCls: 'icon-reload',
    text: '重置',
    onClick: function () {
        alert('重置')
    }
});
var userdb = ["name","tel","email","dpt","role"];

for (const i of userdb) {
    $("#user-"+i).textbox()
}

$('#user-table').datagrid({
    url: '/user/list',
    method: 'get',
    loadFilter: pagerFilter,
    pagination: true,
    pageList: [1,2,5,10],
    checkbox: true,
    toolbar: [{
        iconCls: 'icon-add',
        text: '增加',
        handler: adduser
    }, '-', {
        iconCls: 'icon-cancel',
        text: '删除',
        handler: deleteuser
    }, '-', {
        iconCls: 'icon-edit',
        text: '修改',
        handler: function () {
            alert('修改按钮')
        }
    }, '-', {
        iconCls: 'icon-search',
        text: '查找',
        handler: function () {
            alert('查找按钮')
        }
    }],
    columns: [
        [{
                field: 'ck',
                checkbox: true
            },
            {
                field: 'name',
                title: '姓名',
                width: 100,
                align: 'center'
            },
            {
                field: 'tel',
                title: '手机号',
                width: 200,
                align: 'center'
            },
            {
                field: 'email',
                title: '邮箱',
                width: 200,
                align: 'center'
            },
            {
                field: 'dpt',
                title: '部门',
                width: 200,
                align: 'center'
            },
            {
                field: 'role',
                title: '角色',
                width: 100,
                align: 'center'
            }
        ]
    ]
});

function adduser() {
    $('#user-dd').dialog({
        title: '增加新角色',
        width: 500,
        height: 200,
        closed: false,
        cache: false,
        href: '/views/user/user-dialog.html',
        modal: true,
        buttons: [{
            text: '保存',
            handler: sendData
        }, {
            text: '关闭',
            handler: function () {
                $('#user-dd').dialog('close');
            }

        }]
    });

}

function sendData() {
    var data = {
        name: $("#user-name").val(),
        tel: $("#user-tel").val(),
        email: $("#user-email").val(),
        dpt: $("#user-dpt").val(),
        role: $("#user-role").val()
    };

    var inputData = $(".user-input");
    for (const iterator of inputData) {
        if (iterator.value === "") {
            alert("请输入完整信息");
            return;
        }
    }
    $.ajax({
        type: "POST",
        url: "/user/add",
        data: data,
        dataType: "json",
        success: function (response) {
            if (response.code == 0) {
                console.log('success added');
                alert("新增成功！")
                $('#user-table').datagrid('reload');
                $('#user-dd').dialog('close');
            } else {
                alert("新增失败！");
            }

        }
    });
}

function deleteuser() {
    confirm("确认要删除吗？");
    var value = $('#user-table').datagrid('getChecked');
    if (value.length == 0) {
        alert("请选中要删除的数据");
        return;
    }
    var id = [];
    for (const iterator of value) {
        id.push(iterator._id);
    }
    console.log(value);
    $.ajax({
        type: "delete",
        url: "/user/delete",
        data: {
            _id: id
        },
        success: function (response) {
            if (response.code == 0) {
                console.log('success added');
                $('#user-table').datagrid('reload');
                alert("删除成功！");
            } else {
                alert("删除失败！");
            }
        }
    });

}

