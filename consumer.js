const { kafka } = require('./kafka');

const createConsumer = async ({ id, topic, partition }, name) => {
  try {
    const consumer = kafka.consumer({
      groupId: id
    });

    await consumer.connect();
    await consumer.subscribe({
      topic,
      fromBeginning: true
    });

    consumer.run({
      eachMessage: async ({ partition: messagePartition, message, topic }) => {
        try {
          if (messagePartition !== partition) {
            return;
          }

          console.log(
            `${name} <- topic: "${topic}" | partition: ${messagePartition} | key: ${
              message.key
            } | time: ${new Date(Number(message.timestamp)).toLocaleString(
              'ru-RU'
            )} | value: ${message.value}`
          );
        } catch (error) {
          console.log(`Consumer message error: ${error.message}`);
        }
      }
    });

    return consumer;
  } catch (error) {
    console.log(`Failed to create consumer: ${error.message}`);
  }
};

module.exports = {
  createConsumer
};
