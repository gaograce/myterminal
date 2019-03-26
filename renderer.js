var os = require('os')
var pty = require('node-pty')
var Terminal = require('xterm').Terminal
var logger = require('./log').default

// Initialize node-pty with an appropriate shell
const shell = process.env[os.platform() === 'win32' ? 'COMSPEC' : 'SHELL']
let env = process.env
env['LC_ALL'] = 'zh_CN.UTF-8'
env['LANG'] = 'zh_CN.UTF-8'
env['LC_CTYPE'] = 'zh_CN.UTF-8'
const ptyProcess = pty.spawn(shell, [], {
  name: 'xterm-color',
  cols: 80,
  rows: 30,
  cwd: process.cwd(),
  env: env,
  encoding: null
})

// Initialize xterm.js and attach it to the DOM
const xterm = new Terminal({
  cols: 80,
  rows: 30,
  theme: {
    foreground: 'rgb(254,239,143)',
    background: 'rgb(22,102,47)',
    cursor: 'rgb(254,239,143)'
  }
})
xterm.open(document.getElementById('xterm'))

// Setup communication between xterm.js and node-pty
xterm.on('data', (data) => {
  logger.log(Buffer.from(data))
  logger.log('xterm:' + Buffer.from(data).toString())
  ptyProcess.write(Buffer.from(data))
})
ptyProcess.on('data', function (data) {
  logger.log(data)
  logger.log('ptyProcess:' + data.toString())
  xterm.write(data.toString())
})
ptyProcess.write('export LANG=zh_CN.UTF-8\n')
