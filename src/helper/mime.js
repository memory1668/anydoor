const path = require('path')

const mimeTypes = {
  'css': {
    text:'text/css',
    icon:'/CSS3.png'
  },
  'gif':{
    text: 'image/gif',
    icon:'/text.png'
  },
  'html':{
    text: 'text/html',
    icon:'/HTML5.png'
  },
  'ico':{
    text: 'image/x-icon',
    icon:'/img.png'
  },
  'jpeg':{
    text: 'image/jpeg',
    icon:'/img.png'
  },
  'jpg':{
    text: 'image/jpeg',
    icon:'/img.png'
  },
  'js':{
    text: 'text/javascript',
    icon:'/javascript.png'
  },
  'json':{
    text: 'application/json',
    icon:'/json.png'
  },
  'pdf':{
    text: 'application/pdf',
    icon:'/text.png'
  },
  'png':{
    text: 'image/png',
    icon:'/img.png'
  },
  'svg':{
    text: 'image/svg+xml',
    icon:'/text.png'
  },
  'swf':{
    text:'application/x-shockwave-flash',
    icon:'/text.png'
  } ,
  'tiff':{
    text: 'image/tiff',
    icon:'/text.png'
  },
  'txt':{
    text: 'text/plain',
    icon:'/text.png'
  },
  'wav':{
    text: 'audio/x-wav',
    icon:'/text.png'
  },
  'wma':{
    text: 'audio/x-ms-wma',
    icon:'/text.png'
  },
  'wmv':{
    text: 'video/x-ms-wmv',
    icon:'/text.png'
  },
  'xml':{
    text: 'text/xml',
    icon:'/text.png'
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
