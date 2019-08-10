const path = require('path')

const mimeTypes = {
  'css': {
    text:'text/css'
  },
  'gif':{
    text: 'image/gif'
  },
  'html':{
    text: 'text/html'
  },
  'ico':{
    text: 'image/x-icon'
  },
  'jpeg':{
    text: 'image/jpeg'
  },
  'jpg':{
    text: 'image/jpeg'
  },
  'js':{
    text: 'text/javascript'
  },
  'json':{
    text: 'application/json'
  },
  'pdf':{
    text: 'application/pdf'
  },
  'png':{
    text: 'image/png'
  },
  'svg':{
    text: 'image/svg+xml'
  },
  'swf':{
    text:'application/x-shockwave-flash'
  } ,
  'tiff':{
    text: 'image/tiff'
  },
  'txt':{
    text: 'text/plain'
  },
  'wav':{
    text: 'audio/x-wav'
  },
  'wma':{
    text: 'audio/x-ms-wma'
  },
  'wmv':{
    text: 'video/x-ms-wmv'
  },
  'xml':{
    text: 'text/xml'
  }
}

module.exports = (fileName)=>{
  let ext = path.basename(fileName)
                .split('.')
                .pop()
                .toLowerCase()
  if(!ext){
    ext = fileName
  }
  return mimeTypes[ext] || mimeTypes['txt']
}
