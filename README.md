### 用代码实现 frank.com:8001 和 jack.com:8002 之间的 JSONP 请求
#### 用图片发请求
#### 用script发请求
#### SRJ方案（server rendered javascript）服务器返回的javascript
#### 解耦 -> JSONP
JSONP
请求方：frank.com 的前端程序员（浏览器）
响应方：jack.com 的后端程序员（服务器）

1. 请求方创建 script，src 指向响应方，同时传一个查询参数 ?callbackName=yyy
2. 响应方根据查询参数callbackName，构造形如
    2.1. yyy.call(undefined, '你要的数据')
    2.2. yyy('你要的数据')
    这样的响应
3. 浏览器接收到响应，就会执行 yyy.call(undefined, '你要的数据')
4. 那么请求方就知道了他要的数据

这就是 JSONP

约定：
1. callbackName -> callback
2. yyy -> 随机数 frank1122334111()

jQuery如何发送jsonp请求？
 $.ajax({
 url: "http://jack.com:8002/pay",
 dataType: "jsonp",
 success: function( response ) {
     if(response === 'success'){
     amount.innerText = amount.innerText - 1
     }
 }
 })

 $.jsonp()
