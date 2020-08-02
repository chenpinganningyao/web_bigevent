$(function () {
    var form = layui.form
    form.verify({
        nickname: function (value) {
            if (value.trim().length > 6) {
                return ('昵称输入1~6位')
            }
        }
    })
    initUserInfo()
    //初始化用户信息
    var layer = layui.layer
    function initUserInfo() {
        $.ajax({
            type: 'get',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // console.log(res);
                form.val('formUserInfo', res.data)
            }
        })
    }
    $('#btnReset').on('click', function (e) {
        e.preventDefault()
        initUserInfo()
    })
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                window.parent.getUserInfo()
            }
        })
    })
})