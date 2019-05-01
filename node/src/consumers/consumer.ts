/** @format */
import * as Kafka from 'node-rdkafka'
import config from './config'
import topics from './topic'
var consumer = new Kafka.KafkaConsumer(config, {})

export const _consume = () => {
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
    })
}
