var kafka = require('kafka-node')
Consumer = kafka.Consumer
client = new kafka.KafkaClient()
consumer = new Consumer(
  client,
  [{ topic: 'dbserver1.test.testC', partition: 0 }],
  {
    autoCommit: true
  }
)
console.log('is running')
consumer.on('message', function(message) {
  console.log(message)
})
