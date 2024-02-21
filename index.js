const { createConsumer } = require('./consumer');
const { admin } = require('./kafka');
const { createProducer } = require('./producer');

(async () => {
  try {
    const topics = await admin.listTopics();
    if (topics.length !== 0) {
      await admin.deleteTopics({
        topics
      });
      console.log(`Topics deleted: ${topics.join(', ')}`);
    }

    const partitionsCount = 5;

    await admin.createTopics({
      topics: [
        {
          topic: 'receipts',
          numPartitions: partitionsCount
        }
      ]
    });
    console.log('Topic receipts created');

    for (let i = 0; i < partitionsCount; i++) {
      await createProducer(i, `Producer ${i + 1}`);
      await createConsumer(
        {
          id: `Consumer ${i + 1}`,
          partition: i,
          topic: 'receipts'
        },
        `Consumer: ${i + 1}`
      );
    }
  } catch (error) {
    console.log(error);
  }
})();
