#!/usr/bin/env node
const WebSocket = require('ws')
const printii = require('printii')(__dirname)
const clear = require('clear')
const cursor = require('cli-cursor')
const chalk = require('chalk')
const readline = require('readline')

clear()
printii()
cursor.hide()
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

const host = process.env.HOST || 'ws://localhost:3333'
const ws = new WebSocket(host)
const interval = process.env.SECONDS * 1000 || process.env.MS || 3000
const args = process.argv.slice(2)
const text = args[0] || 'WS-TEST'
let count = 0

ws.on('open', () => {
  console.log(`Exit with ${chalk.red('q')} or ${chalk.red('ctrl+c')}`)
  console.log(`Connected to ${chalk.blue(host)}`)
  console.log(`Interval: ${chalk.blue(interval + ' ms')}`)
  console.log(`Text: ${chalk.blue(text)}`)
  setInterval(() => {
    const message = `${text} @${new Date()}`
    ws.send(message)
    ++count
    process.stdout.write(`Sent: ${chalk.white(count)}\r`)
  }, interval)
})

ws.on('close', () => {
  console.log('Disconnected.')
  process.exit()
})

process.stdin.on('keypress', (str, key) => {
  // Exit on q or ctrl+c.
  if (key.name === 'q' || key.sequence === '\u0003') {
    console.log('\n\n', chalk.gray('Bye!'))
    process.exit()
  }
})
