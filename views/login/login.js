$('#button').click(function (e) { 
    e.preventDefault();
    $.ajax({
        type: "post",
        url: "/user/check",
        data: {
            tel: $('#tel').val(),
            password: $('#pwd').val()
        },
        success: function (response) {
            if (response.code == 0) {
                alert('登录成功');
                location.reload();
            }
        }
    });
});