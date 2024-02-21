const { Kafka } = require('kafkajs');

process.env['KAFKAJS_NO_PARTITIONER_WARNING'] = 1;

const kafka = new Kafka({
  clientId: 'admin',
  brokers: ['localhost:9092']
});

const admin = kafka.admin();

module.exports = {
  kafka,
  admin
};
