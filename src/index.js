const yargs = require('yargs')
const Server = require('./app')

const argv = yargs
  .usage('anywhere1668[options]')
  .option('p',{//命令行选项p
    alias:'port',
    describe:'端口号',
    default:'3000'
  })
  .option('h',{//命令行选项h
    alias:'hostname',
    describe:'主机号',
    default:'127.0.0.1'
  })
  .option('d',{//命令行选项d
    alias:'root',
    describe:'根目录',
    default:process.cwd()
  })
  .version()
  .alias('v','verson')
  .help()
  .argv

const server = new Server(argv)
server.start()
