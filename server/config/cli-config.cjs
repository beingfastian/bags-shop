require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    dialect: 'postgres',
    timezone: 'Asia/Karachi',
    logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false,
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false,
      timezone: 'Asia/Karachi',
    },
  },
  test: {
    username: process.env.DATABASE_USERNAME,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME + '_test',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    dialect: 'postgres',
    timezone: 'Asia/Karachi',
    logging: false,
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false,
      timezone: 'Asia/Karachi',
    },
  },
  production: {
    username: process.env.DATABASE_USERNAME,
    password: String(process.env.DATABASE_PASSWORD),
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT) || 5432,
    dialect: 'postgres',
    timezone: 'Asia/Karachi',
    logging: false,
    dialectOptions: {
      ssl: process.env.DATABASE_SSL === 'true'
        ? { require: true, rejectUnauthorized: false }
        : false,
      timezone: 'Asia/Karachi',
    },
  }
};