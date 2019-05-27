var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]||8888

var server = http.createServer(function(request, response){
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query = temp.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  if(path === '/'){
    var string = fs.readFileSync('./index.html','utf8')
    var amount = fs.readFileSync('./db_amount.tb','utf8')
    string = string.replace("{{amount}}",amount)
    response.setHeader('Content-Type','text/html;charset=utf-8')
    response.write(string)
    response.end()
  }
  else if(path === '/style'){
    var string = fs.readFileSync('./style.css','utf8')
    response.setHeader('Content-Type','text/css')
    response.end(string)
  }
  else if(path === '/pay/image'){//用图片造get请求
    var amount = fs.readFileSync('./db_amount.tb','utf8')
    if(Math.random() > 0.5){
      var new_amount = amount - 1
      fs.writeFileSync('./db_amount.tb',new_amount)
      response.statusCode = 200
      //真的要返回一张图片，不然img就一直onerror
      response.setHeader('Content-Type', 'image/png')
      response.write(fs.readFileSync('./leaf.png'))
    }
    else{
      response.statusCode = 400
      response.write('error')
    }
    response.end()
  }
  else if(path === '/pay/script'){//用script造get请求
    var amount = fs.readFileSync('./db_amount.tb','utf8')
    if(Math.random() > 0.5){
      var new_amount = amount - 1
      fs.writeFileSync('./db_amount.tb',new_amount)
      response.statusCode = 200
      response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
      response.write(`
        ${query.callback}.call(undefined,{
          "success":true,
          "amount":${new_amount}
        })
      `)//这个是可以执行的js代码，执行callback传过来的函数
    }
    else{
      response.statusCode = 400
      response.write('error')
    }
    response.end()
  }
  else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.end('地址有误')
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)