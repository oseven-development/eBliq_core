/** @format */

import {_consume} from './consumers/consumer'
import * as Kafka from 'node-rdkafka'
import config from './consumers/config'
import topics from './consumers/topic'
var cors = require('cors')

var consumer = new Kafka.KafkaConsumer(config, {})
import * as express from 'express'
const app = express()

const SSE_RESPONSE_HEADER = {
  Connection: 'keep-alive',
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache',
  'X-Accel-Buffering': 'no',
}
var users = {}

app.use(cors())

app.get('/', function(req, res) {
  res.send('Hello World!')
})

app.get('/get', function(req, res) {
  let userId = getUserId(req)

  users[userId] = req

  let data
  res.writeHead(200, SSE_RESPONSE_HEADER)

  res.write(`data: los gehts\n\n`)

  consumer.connect()
  consumer
    .on('ready', function() {
      consumer.subscribe(topics)
      consumer.consume()
    })
    .on('data', function(data) {
      /* JSON converter */
      // console.log(data)
      // console.log(data.value.toString())
      // console.log('tostring value ')
      const exdata = JSON.parse(data.value.toString())
      let resdata: any
      exdata.payload.after !== null
        ? (resdata = JSON.parse(exdata.payload.after))
        : (resdata = JSON.parse(exdata.payload.patch))
      console.log(resdata)
      res.write(`data: ${JSON.stringify(resdata)}\n\n`)
    })

  req.on('close', function() {
    let userId = getUserId(req)
    console.log(`*** Close. userId: "${userId}"`)
    // Breaks the interval loop on client disconnected
    // Remove from connections
    delete users[userId]
  })

  req.on('end', function() {
    let userId = getUserId(req)
    console.log(`*** End. userId: "${userId}"`)
  })

  // Writes response header.
})

function getUserId(req) {
  // Note:
  // In reality, you should use userId stored in req.session,
  // but not URI parameter.
  // return req.params.userId;
  return 1
}

app.listen(3555, function() {
  console.log('Example app listening on port 3555!')
})
