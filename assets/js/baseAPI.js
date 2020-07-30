var baseURl = 'http://ajax.frontend.itheima.net'
//没次调用ajax的时候 会先调用ajaxPrefilter函数
//这个函数可以拿到我们给AJax的配置
$.ajaxPrefilter(function (options) {
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url = baseURl + options.url
})