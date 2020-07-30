$(function () {
    // 点击去注册账号链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //去登陆
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    //从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    //通过layui.form定义校验规则函数
    form.verify({
        pwd: [/^\S{6,12}$/, '密码必须6到12位切不能出现空格'],
        //两次密码保持一至
        repwd: function (value) {
            //value 是确认密码框的内容
            //还需要拿到输入密码框的内容
            //再进行一次判断
            var pwd = $('#reg-pwd').val()
            if (pwd !== value) {
                return "两次密码不一致！"
            }
        }
    })
    // 注册表单事件
    
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            type: 'post',
            url: '/api/reguser',
            // data: $('#form-reg').serialize(),
            data: {
                username: $('#form-reg [name=username]').val(),
                password: $('#form-reg [name=password]').val()
            },
            success: function (res) {
                console.log(res);
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                $('#form-reg')[0].reset()
                $('#link_login').click()

            }
        })
    })
    //登录表单事件
    $('#form-login').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status != 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                //存数据
                localStorage.setItem('token', res.token)
                //登录成功跳转页面
                location.href = '/index.html'
            }

        })
    })
})