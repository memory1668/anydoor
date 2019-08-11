const fs = require('fs')
const {promisify} = require('util')
const Handlebars = require('handlebars')
const path = require('path')
const conf = require('../config/defaultConfig')
const mime = require('./mime')
const compress = require('./compress')
const isFresh = require('./cache')

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
      const iconPath = path.relative(conf.root,'E:\\myweb\\anydoor\\src\\images')
      const data = {
        files:files.map(file=>{
          const sonPath = path.join(fileName,file)//子目录的路径
          let sonStats = fs.statSync(sonPath)//要用同步的方法，用来判断子目录所有文件是文件还是文件夹
          return {
            file,
            icon:sonStats.isDirectory() ? `/${iconPath + '/folder.png'}`:`/${iconPath + mime(file).icon}`,//是文件夹还是文件，是文件还要进一步判断mime类型
          }
        }),
        title:path.basename(fileName),
        dir: dir ? `/${dir}`:'',//加斜杠防止路径出错，进入深层目录会出现奇怪的错误，待解决
      }
      // console.info(data.imgSrc)
      res.end(template(data))
    }else if(stats.isFile()){
      res.setHeader('Content-Type',mime(fileName).text)
      if(isFresh(req,res,stats)){
        res.statusCode = 304
        res.end()
        return
      }
      res.statusCode = 200
      let rs = fs.createReadStream(fileName)
      if(fileName.match(conf.compress)){//对配置文件中特定的文件进行压缩
        rs = compress(rs,req,res)//对文件流进行压缩返回值是压缩后的流
      }
      rs.pipe(res)
    }
  }
  catch(ex){
      console.error(ex.toString())
      res.statusCode = 404
      res.setHeader('Content-Type','text/plain charset=utf-8')
      res.end(`${fileName} is not a directory or file`)
  }
}
