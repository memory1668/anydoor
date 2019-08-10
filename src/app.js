const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('./helper/route')

const server = http.createServer((req,res)=>{
  const win32Url = req.url.replace(/\//g,"\\")//转换成windows中的路径
  const fileName = conf.root + win32Url
  // if(fileName.search("icomoon") == -1){
    route(req,res,fileName)
  // }
  // res.statusCode = 200
  // res.setHeader('Content-Type','text/plain')
})

server.listen(conf.port,conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`server started at ${chalk.green(addr)}`)
})
