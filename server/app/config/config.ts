import dotenv from 'dotenv';

dotenv.config();

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

const defaultConfig = {
  username: 'root',
  password: '',
  database: {
    development: 'database_development',
    test: 'database_test',
    production: 'database_production',
  },
  host: '127.0.0.1',
  dialect: 'postgres' as Dialect,
};

interface IDatabaseConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  dialect?: Dialect;
  use_env_variable?: string;
  ssl?: boolean;
  dialectOptions?: {
    ssl: {
      require: boolean;
      rejectUnauthorized: boolean;
    };
  };
}

interface IConfig {
  development: IDatabaseConfig;
  test: IDatabaseConfig;
  production: IDatabaseConfig;
}

const config: IConfig = {
  development: {
    username: process.env.DATABASE_USERNAME || defaultConfig.username,
    password: process.env.DATABASE_PASSWORD || defaultConfig.password,
    database: process.env.DATABASE_NAME || defaultConfig.database.development,
    host: process.env.DATABASE_HOST || defaultConfig.host,
    dialect: (process.env.DATABASE_DIALECT as Dialect) || defaultConfig.dialect,
  },
  test: {
    username: process.env.DATABASE_USERNAME || defaultConfig.username,
    password: process.env.DATABASE_PASSWORD || defaultConfig.password,
    database: process.env.DATABASE_NAME || defaultConfig.database.test,
    host: process.env.DATABASE_HOST || defaultConfig.host,
    dialect: (process.env.DATABASE_DIALECT as Dialect) || defaultConfig.dialect,
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  production: {
    username: process.env.DATABASE_USERNAME || defaultConfig.username,
    password: process.env.DATABASE_PASSWORD || defaultConfig.password,
    database: process.env.DATABASE_NAME || defaultConfig.database.production,
    host: process.env.DATABASE_HOST || defaultConfig.host,
    dialect: (process.env.DATABASE_DIALECT as Dialect) || defaultConfig.dialect,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};

export default config;
