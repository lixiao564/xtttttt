$('#hero').textbox({
    iconCls: 'icon-man',
    iconAlign: 'left'
})

$('#hero-btn1').linkbutton({
    iconCls: 'icon-search',
    text: '查询',
    onClick: function () {
        alert('查询')
    }
});

$('#hero-btn2').linkbutton({
    iconCls: 'icon-reload',
    text: '重置',
    onClick: function () {
        alert('重置')
    }
});

$('#hero-table').datagrid({

    toolbar: [{
        iconCls: 'icon-add',
        text: '增加',
        handler: function () {
            alert('增加按钮')
        }
    }, '-', {
        iconCls: 'icon-cancel',
        text: '删除',
        handler: function () {
            alert('删除按钮')
        }
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
                field: 'num',
                title: '编号',
                width: 100,
                align: 'center'
            },
            {
                field: 'name',
                title: '姓名',
                width: 100,
                align: 'center'
            },
            {
                field: 'age',
                title: '年龄',
                width: 100,
                align: 'center'
            },
            {
                field: 'area',
                title: '籍贯',
                width: 100,
                align: 'center'
            }
        ]
    ]
});