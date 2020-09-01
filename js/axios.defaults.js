//对axios进行二次封装
axios.defaults.baseURL = "http://localhost:8888";
axios.defaults.headers["Content-Type"] = "application/x-www-form-urlencoded"
axios.defaults.transformRequest = function (data) {
    if (!data) return data;
    let result = ``;
    for (let attr in data) {
        if (!data.hasOwnProperty(attr)) break;
        result += `&${attr}=${data[attr]}`;
    }
    return result.substring(1);
}
//配置请求拦截器
axios.interceptors.request.use(config => {
    return config
})
//配置响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}), reason => {
    //如果路径出错了，通过会返回404 还有一些其他错误
    //console.log(reason)
    if (reason.response) {
        switch (String(reason.response.status)) {
            case "404":
                alert("当前请求的地址不存在！")
                break;
            default:
                break;
        }
    }
     //直接创建出一个失败的promis
    return Promise.reject(reason);
}