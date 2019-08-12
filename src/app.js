const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server{
  constructor(config){
    this.conf = Object.assign({},conf,config)//合并配置
  }
  start(){
    const server = http.createServer((req,res)=>{
      const fileName = this.conf.root + req.url//访问资源的根目录
      route(req,res,fileName,this.conf)
    })
    server.listen(this.conf.port,this.conf.hostname,()=>{
      const host = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`server started at:${chalk.green(host)}`)
      openUrl(host)//自动打开浏览器
    })
  }
}
module.exports = Server
