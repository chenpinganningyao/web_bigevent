var baseURl = 'http://ajax.frontend.itheima.net'
//没次调用ajax的时候 会先调用ajaxPrefilter函数
//这个函数可以拿到我们给AJax的配置
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = baseURl + options.url
    //统一为有权限的接口 设置headers请求头
    if (options.url.indexOf('/my/') != -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ""
        }
    }
    options.complete = function (res) {
        if (res.responseJSON.status == 1 && res.responseJSON.message === '身份认证失败！') {
            // 清空本地token
            localStorage.removeItem('token')
            //跳回登录页面
            location.href = '/login.html'
        }
    }

})
