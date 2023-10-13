var { Kafka } = require('kafkajs')
var kafka = new Kafka({
  clientId: 'myapp',
  brokers: ['localhost:9092']
})

var consumer = kafka.consumer({groupId:"myapp-consumer-group"})
var topic = 'observation5-json'

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true})//true for earliest offset && false for latest offset

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      })
    },
  })
}


run().catch(console.error)

