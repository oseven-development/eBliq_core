const { Kafka } = require('kafkajs')

const fs = require('fs')
const ip = require('ip')

const host = process.env.HOST_IP || ip.address()

const kafka = new Kafka({
  brokers: [`localhost:9092`],
  clientId: 'example-producer'
})
const producer = kafka.producer()
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
  // Producing
  //   await producer.connect()
  //   await producer.send({
  //     topic: 'topic-test',
  //     messages: [{ value: 'Hello KafkaJS user!' }]
  //   })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({
    topic: 'dbserver1.test.testC',
    fromBeginning: true
  })
  const dataArray = []
  let c
  const x = await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log('in messeage')
      console.log(message.value.toString('utf8'))
      let c = message.value.toString('utf8')
      dataArray.push(message)
      return message
    }
  })
  console.log('nach allem')
  console.log(c)
}

run().catch(console.error)
