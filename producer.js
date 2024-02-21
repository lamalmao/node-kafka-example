const { kafka } = require('./kafka');

const createProducer = async (partition, name) => {
  try {
    const producer = kafka.producer();
    await producer.connect();
    let counter = 1;

    const timer = setInterval(async () => {
      try {
        const value = `Receipt №${counter}`;
        await producer.send({
          topic: 'receipts',
          messages: [
            {
              partition,
              value,
              key: counter.toString()
            }
          ]
        });
        console.log(`${name} -> ${value}`);
        counter++;
      } catch (error) {
        console.log(
          `Error sending message to partition ${partition}: ${error.message}`
        );
      }
    }, 10 * 1000);

    return timer;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createProducer
};
