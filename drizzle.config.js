import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });  // Only call dotenv.config once

console.log("Database URL:", process.env.NEXT_PUBLIC_DB_CONNECTION_STRING);  // Debugging line

export default {
  schema: "./configs/schema.jsx",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_DB_CONNECTION_STRING,
  },
};



