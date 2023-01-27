import { MongoClient } from 'mongodb';

const url = process.env.MONGO_URL;
const mongoClient = new MongoClient(url);

(async () => {
  try {
    await mongoClient.connect();
    process.on('SIGINT', () => {
      mongoClient.close().then(() => {
        console.info('Закрытие соединения с базой');
        process.exit(0);
      });
    });
    const database = mongoClient.db('tourists');
    const result = await database.command({ ping: 1 });
    console.log('Соединенеие с бд успешно установлено');
    console.log(result);
    await database.collection('posts').deleteMany({}); // for testing only
    await database.collection('users').deleteMany({}); // for testing only
    database.collection('users').createIndex({ login: 1 }, { unique: true });
    database.collection('users').createIndex({ email: 1 }, { unique: true });
  } catch (err) {
    console.log('Возникла ошибка');
    console.log(err);
    await mongoClient.close();
  }
})();

export default mongoClient;
