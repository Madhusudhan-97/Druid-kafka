var {Kafka} = require('kafkajs')
createPartitioner();

async function createPartitioner(){
    try 
    {
        var kafka = new Kafka({
            "clientId":"myapp",
            "brokers":['localhost:9092']
        })
        var admin=kafka.admin()
        await admin.connect()
        await admin.createTopics({
            topics:[{
                "topic":"observation",
                "numPartitions":2
            }]
        })
        console.log("Topic created successfully")
        await admin.disconnect();
    } 
    catch (error) 
    {
        console.log(`Something has gone wrong ${error}`)
    }
    finally{
        process.exit(0);
    }
}
