const BASE_URL = 'http://test.shjih.com:8071/jsonrpc';

/*
* @param {string} url 接口地址
* @param {string} method 请求方法
* @param {object} params 请求参数
* @return 返回Promise
* */

/*fetch()接收到一个代表错误到HTTP状态码时，并不会将返回到Promise标记为reject,而是
* 标记为resolve,并将response.ok设置为false,只有在遇到网络故障或请求被阻止的时候才会标记为reject
* 注意这是它与jQuery.ajax()最大的区别*/

export function fetchRequestPost(url, method, params) {
    let body = params ? {
        method: method,
        params: params,
        id: "1",
        _st: ''
    } : {
        method: method,
        id: "1",
        _st: ''
    };
    return new Promise ((resolve, reject) => {
        fetch(BASE_URL + url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": 'application/json;charset=utf-8',
            },
            body: JSON.stringify(body), //将对象解析成JSON字符串
            mode: 'cors'
        }).then (response => response.json())
            .then(resJson => resolve(resJson))
            .catch(err => reject(err))
    })

}
