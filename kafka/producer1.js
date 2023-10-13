const { Kafka } = require('kafkajs')
var Chance = require('chance');
var chance = new Chance()
const { Partitioners } = require('kafkajs')
const kafka = new Kafka({
  clientId: 'myapp',
  brokers: ['localhost:9092']
})

const producer = kafka.producer()
var topic = 'observation5-json'


var produceMessage = async ()=>{
//   var value =chance.animal()
var yourJsonData={
    id:chance.d100(),
    name:chance.name(),
    age:chance.age(),
    ipaddress:chance.ip(),
    address:{
        street:chance.street(),
        city:chance.city(),
        location:chance.longitude() +" "+chance.latitude()
    },
    time: new Date()
}
    

  try {
    console.log(yourJsonData);
    await producer.send({
      topic,
      "messages": [
        {
            "value": JSON.stringify(yourJsonData),  
        }
    ]
    })
  } catch (error) {
    console.log(error);
  }
}

const run = async () => {
  // Producing
  await producer.connect()
  
  setInterval(produceMessage, 15000)

}
run().catch(console.error)
