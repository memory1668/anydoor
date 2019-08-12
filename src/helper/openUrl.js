const {exec} = require('child_process')
module.exports = url=>{
  switch(process.platform){
    case 'darwin'://苹果系统
      exec (`open ${url}`)
      break
    case 'win32'://windows系统
      exec(`start ${url}`)
      break
  }
}
