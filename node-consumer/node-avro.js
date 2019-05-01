const Kafka = require('node-rdkafka')
var avro = require('avsc')

var schema = avro.Type.forSchema({
  type: 'record',
  name: 'Envelope',
  namespace: 'dbserver1.test.testC',
  fields: [
    {
      name: 'after',
      type: [
        'null',
        {
          type: 'string',
          'connect.version': 1,
          'connect.name': 'io.debezium.data.Json'
        }
      ],
      default: null
    },
    {
      name: 'patch',
      type: [
        'null',
        {
          type: 'string',
          'connect.version': 1,
          'connect.name': 'io.debezium.data.Json'
        }
      ],
      default: null
    },
    {
      name: 'source',
      type: {
        type: 'record',
        name: 'Source',
        namespace: 'io.debezium.connector.mongo',
        fields: [
          { name: 'version', type: ['null', 'string'], default: null },
          { name: 'connector', type: ['null', 'string'], default: null },
          { name: 'name', type: 'string' },
          { name: 'rs', type: 'string' },
          { name: 'ns', type: 'string' },
          { name: 'sec', type: 'int' },
          { name: 'ord', type: 'int' },
          { name: 'h', type: ['null', 'long'], default: null },
          {
            name: 'initsync',
            type: [{ type: 'boolean', 'connect.default': false }, 'null'],
            default: false
          }
        ],
        'connect.version': 1,
        'connect.name': 'io.debezium.connector.mongo.Source'
      }
    },
    { name: 'op', type: ['null', 'string'], default: null },
    { name: 'ts_ms', type: ['null', 'long'], default: null }
  ],
  'connect.name': 'dbserver1.test.testC.Envelope'
})

const type = avro.Type.forSchema({
  type: 'record',
  fields: [{ name: 'name', type: 'string' }]
})

var consumer = new Kafka.KafkaConsumer(
  {
    'group.id': 'kafka',
    'metadata.broker.list': 'localhost:9092'
  },
  {}
)

consumer.connect()

consumer
  .on('ready', function() {
    consumer.subscribe([
      'dbserver1.test.testC',
      'dbserver1.demo.order',
      'dbserver1.test.ab'
    ])

    // Consume from the librdtesting-01 topic. This is what determines
    // the mode we are running in. By not specifying a callback (or specifying
    // only a callback) we get messages as soon as they are available.
    consumer.consume()
  })
  .on('data', function(data) {
    // Output the actual message contents

    // console.log('stringfy')
    // console.log(JSON.stringify(data))
    // console.log('toString')
    // console.log(data.toString())
    // console.log('typeOf')
    // console.log(typeof data)
    // console.log('raw')
    // console.log(data)
    // console.log('tostring value')
    // console.log(data.value.toString())

    /* JSON converter */
    console.log(data)
    console.log(data.value.toString())

    console.log('tostring value ')
    const exdata = JSON.parse(data.value.toString())
    let resdata
    exdata.payload.after !== null
      ? (resdata = JSON.parse(exdata.payload.after))
      : (resdata = JSON.parse(exdata.payload.patch))

    console.log(resdata)
  })
