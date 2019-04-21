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
  await producer.connect()
  await producer.send({
    topic: 'topic-test',
    messages: [{ value: 'Hello KafkaJS user!' }]
  })

  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: 'topic-test', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString()
      })
    }
  })
}

run().catch(console.error)
