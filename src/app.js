const http = require('http')
const conf = require('./config/defaultConfig')
const chalk = require('chalk')
const route = require('./helper/route')
const openUrl = require('./helper/openUrl')

class Server{
  constructor(config){
    this.conf = Object.assign({},conf,config)
  }
  start(){
    const server = http.createServer((req,res)=>{
      const win32Url = req.url
      const fileName = this.conf.root + win32Url
      route(req,res,fileName,this.conf)
    })

    server.listen(this.conf.port,this.conf.hostname,()=>{
      const addr = `http://${this.conf.hostname}:${this.conf.port}`
      console.info(`server started at ${chalk.green(addr)}`)
      openUrl(addr)
    })
  }
}
module.exports = Server
