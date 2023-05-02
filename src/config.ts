import { SES } from 'aws-sdk';
import { config } from "dotenv";
config();

// Env. variables
const user = process.env.MONGO_USER;
const password = process.env.MONGO_PASSWORD;

export const mongo = {
    user: user,
    port: 27017,
    uri: process.env.MONGO_URI || `mongodb+srv://${user}:${password}@cluster.ley27f6.mongodb.net/test`,
};

export const ses = new SES({
    accessKeyId: '<your-access-key-id>',
    secretAccessKey: '<your-secret-access-key>',
    region: '<your-region>',
  });

export const server = {
    port: process.env.NODE_PORT || 8000,
};

export const auth = {
    jwt: {
      secret: 'mysecretkey',
      options: {
        accessExpiresIn: '7d',
        refreshExpiresIn: '15m'
      }
    }
  };
  