const fs = require('fs')
const {promisify} = require('util')
const Handlebars = require('handlebars')
const path = require('path')
const conf = require('../config/defaultConfig')
const mime = require('./mime')

const tplPath = path.join(__dirname,'../template/dir.tpl')
const source = fs.readFileSync(tplPath)
const template = Handlebars.compile(source.toString())
const stat = promisify(fs.stat)
const readdir = promisify(fs.readdir)
module.exports = async function(req,res,fileName){
  try{
    const stats = await stat(fileName)
    if(stats.isDirectory()){
      const files = await readdir(fileName)
      res.statusCode = 200
      res.setHeader('Content-Type','text/html')
      const dir = path.relative(conf.root,fileName)
      const data = {
        files,
        title:path.basename(fileName),
        dir: dir ? `/${dir}`:''
      }
      // console.info(dir)
      res.end(template(data))
    }else if(stats.isFile()){
      res.statusCode = 200
      res.setHeader('Content-Type',mime(fileName).text)
      fs.createReadStream(fileName).pipe(res)
    }
  }
  catch(ex){
      console.error(ex.toString())
      res.statusCode = 404
      res.setHeader('Content-Type','text/plain charset=utf-8')
      res.end(`${fileName} is not a directory or file`)
  }
}
