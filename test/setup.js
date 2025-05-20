const db = require('../knex');

exports.mochaGlobalTeardown = async () => {
  try {
    await db.destroy();
    console.log('✅ Closed database connection');
  } catch (error) {
    console.error(error);
  }
};
