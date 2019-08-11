const {createGzip,createDeflate} = require('zlib')

module.exports = (rs,req,res)=>{
  const acceptEncoding = req.headers['accept-encoding']//获取浏览器支持的压缩方式
  if(!acceptEncoding||!acceptEncoding.match(/\bgzip|deflate\b/)){
    return rs
  }else if(acceptEncoding.match(/\bgzip\b/)){
    res.setHeader('Content-Encoding','gzip')//告知浏览器服务器采用gzip压缩
    return rs.pipe(createGzip())//用gzip的方式对读取的流进行压缩
  }else if(acceptEncoding.match(/\deflate\b/)){
    res.setHeader('Content-Encoding','deflate')
    return rs.pipe(createDeflate())//用deflate的方式对读取的流进行压缩
  }
}
