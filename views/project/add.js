$("#project_dateline").datebox({
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
$('#project_dateline').datebox('calendar').calendar({
    validator: function (date) {
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        return today <= date;
    }
});



$("#project_level").combobox({
    valueField: 'level',
    textField: 'text',
    editable: false,
    width: 160,
    panelHeight: 150,
    data: [{
        'level': 'A',
        'text': 'A'
    }, {
        'level': 'B',
        'text': 'B'
    }, {
        'level': 'C',
        'text': 'C'
    }],
    onSelect: function (record) {
        if (record.level == "A") {
            $(".dptManager input").textbox({
                required: true
            });
            $(".dptHead input").textbox({
                required: true
            });
        } else if (record.level == "B") {

            $(".dptManager input").textbox({
                required: true
            });
            $(".dptHead input").textbox({
                required: false
            });
        } else {
            $(".dptManager input").textbox({
                required: false
            });
            $(".dptHead input").textbox({
                required: false
            });
        }
    }
})

function submit() {
    var p_data = {
        projectName: $("#project_name").val(),
        type: $("#project_type").val(),
        level: $("#project_level").val(),
        expectDate: $("#project_dateline").val(),
        describe: $("#project_describe").val(),
    };
    var h_data = {
        dptManagerName: $("#dptManagerName").val(),
        dptManagerTel: $("#dptManagerTel").val(),
        dptHeadName: $("#dptHeadName").val(),
        dptHeadTel: $("#dptHeadTel").val(),
    };
    var lev = $("#project_level").val();
    console.log();
    if (lev == 'A'){
        for (const key in h_data) {
            if (h_data.hasOwnProperty(key)) {
                const element = h_data[key];
                if(element == ''){
                    alert("请输入必填信息");
                    return;
                }
            }
        }
    }else if(lev == 'B'){
        if(h_data[dptManagerName] == ''||h_data[dptManagerTel] == ''){
            alert("请输入部门主管信息");
            return;
        }
    }else{
        for (const key in p_data) {
            if (p_data.hasOwnProperty(key)) {
                const element = p_data[key];
                if(element == ''){
                    alert("请输入完整信息");
                    return;
                }                
            }
        }
    }
    var data = {};   
    Object.assign(data,p_data,h_data); 
    $.ajax({
        type: "POST",
        url: "/project/add",
        data: data,
        success: function (response) {
            if (response.code == 0) {
                alert("提交成功！");
            } else {
                alert("提交失败！");
            }

        }
    });

}

function getCustomerData() {
    var id = sessionStorage.getItem('id');
    $.ajax({
        type: "get",
        url: "/project/getMsg",
        data: {
            _id: id
        },
        success: function (response) {
            if (response.code == 0) {
                var result = response.data;
                $("#managerName").textbox('setValue', result.userName);
                $("#managerTel").textbox('setValue', result.userTel);
                $("#clientName").textbox('setValue', result.customerName);
                $("#clientType").textbox('setValue', result.customerType);
            }
        }
    });
}

getCustomerData();