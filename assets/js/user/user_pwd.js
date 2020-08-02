$(function () {
    var form = layui.form
    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须6到12位切不能出现空格'],
        //两次密码保持一至
        repwd: function (value) {
            //value 是确认密码框的内容
            //还需要拿到输入密码框的内容
            //再进行一次判断
            var pwd = $('#newPwd').val()
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        },
        samepwd: function (value) {
            //value 是确认密码框的内容
            //还需要拿到输入密码框的内容
            //再进行一次判断
            var pwd = $('#oldPwd').val()
            if (pwd == value) {
                return "新密码不能与旧密码一致！"
            }
        }

    })
    var layer = layui.layer
    $('.layui-form').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/my/updatepwd',
            data: {
                oldPwd: $('.layui-form [name=oldPwd]').val(),
                newPwd: $('.layui-form [name=newPwd]').val()
            },

            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                // layer.msg(res.message)
                //重置表单
                $('.layui-form')[0].reset()
                // 清空本地token
                localStorage.removeItem('token')
                //跳回登录页面
                window.parent.location.href = '/login.html'
            }
        })
    })

})