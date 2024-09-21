import * as dotenv from 'dotenv';
dotenv.config();

interface Config {
  JWT_SECRET: string;
  MONGODB_URI: string;
  PORT: number;
}

const getConfig = (): Config => {
  return {
    JWT_SECRET: process.env.JWT_SECRET || 'default_jwt_secret',
    MONGODB_URI: process.env.MONGODB_URI || 'default_mongodb_uri',
    PORT: parseInt(process.env.PORT || '3000', 10)
  };
};

const config = getConfig();

export default config;
