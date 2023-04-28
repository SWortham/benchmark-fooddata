'use strict'

const autocannon = require('autocannon')

const instance = autocannon({
  url: ['http://127.0.0.1:3000/food/321358', 'http://127.0.0.1:3000/search/nutrients/1005:0.5-0.6', 'http://127.0.0.1:3000/search/nutrients/1005:0.5-200.0'],
  connections: 10, //default
  pipelining: 6, // default
  duration: 10, // default
  warmup: 1,
  workers: 4
}, console.log)

// this is used to kill the instance on CTRL-C
process.once('SIGINT', () => {
  instance.stop()
})

// just render results
autocannon.track(instance, { renderProgressBar: false })