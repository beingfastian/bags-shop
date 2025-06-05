import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME as string,
  process.env.DATABASE_USERNAME as string,
  process.env.DATABASE_PASSWORD as string,
  {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: Number(process.env.DATABASE_PORT) || 5432,
    logging: process.env.SEQUELIZE_LOGGING === 'true' ? console.log : false,
    timezone: 'Asia/Karachi',
    dialectOptions: {
      ssl:
        process.env.DATABASE_SSL === 'true'
          ? { require: true, rejectUnauthorized: false }
          : undefined,
      timezone: 'Asia/Karachi',
    },
  }
);

export default sequelize;
