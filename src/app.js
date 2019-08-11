const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('./helper/route')

const server = http.createServer((req,res)=>{
  const win32Url = req.url
  const fileName = conf.root + win32Url
  route(req,res,fileName)
})

server.listen(conf.port,conf.hostname,()=>{
  const addr = `http://${conf.hostname}:${conf.port}`
  console.info(`server started at ${chalk.green(addr)}`)
})
