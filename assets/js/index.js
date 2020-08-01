$(function () {
    var layer = layui.layer
    //退出
    $('#btnLogout').on('click', function () {
        // console.log(10);
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            //跳回登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })
    // 获取用户基本信息
    getUserInfo()
    function getUserInfo() {
        $.ajax({
            method: 'get',
            url: '/my/userinfo',
            //请求头配置对象
            // headers: {
            //     Authorization: localStorage.getItem('token') || ""
            // },
            success: function (res) {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message)
                }
                // layui.layer.msg(res.message)
                renderAvatar(res.data)
            },
           
        })
    }

    // 渲染用户头像
    function renderAvatar(user) {
        var uname = user.nickname || user.username
        $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show()
        } else {
            $('.layui-nav-img').hide()
            var first = uname[0].toUpperCase()
            // console.log(first);
            $('.text-avatar').html(first).show()
        }
    }
})