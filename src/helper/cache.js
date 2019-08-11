const {cache} = require('../config/defaultConfig')
function refreshRes(stats,res){
  const {maxAge,expires,cacheControl,lastModified,etag} = cache
  if(expires){
    res.setHeader('Expires',(new Date(Date.now() + maxAge*1000)).toUTCString())
  }
  if(cacheControl){
    res.setHeader('Cache-Control',`public,max-age=${maxAge}`)
  }
  if(lastModified){
    res.setHeader('Last-Modified',stats.mtime.toUTCString())
  }
  if(etag){
    res.setHeader('ETag',`${stats.size} - ${stats.mtime}`)//用文件的字节大小减文件最后修改的事件作为资源是否改变的标志
  }
}

module.exports = function isFresh(req,res,stats){
  refreshRes(stats,res)
  const lastModified = req.headers['if-modified-since']
  const etag = req.headers['if-none-match']

  if(!lastModified&&!etag){//第一次请求
    return false
  }
  if(lastModified&&lastModified!==res.getHeader('last-modified')){
    return false
  }
  if(etag&&etag!==res.getHeader('etag')){
    return false
  }
  return true
}
