require('dotenv').config();

console.log('=== Environment Variables ===');
console.log('DATABASE_NAME:', process.env.DATABASE_NAME);
console.log('DATABASE_USERNAME:', process.env.DATABASE_USERNAME);
console.log('DATABASE_PASSWORD:', process.env.DATABASE_PASSWORD ? '***SET***' : 'UNDEFINED');
console.log('DATABASE_HOST:', process.env.DATABASE_HOST);
console.log('DATABASE_PORT:', process.env.DATABASE_PORT);
console.log('DATABASE_SSL:', process.env.DATABASE_SSL);

console.log('\n=== Loaded Configuration ===');
const config = require('./config/cli-config.cjs');
console.log('Config:', JSON.stringify(config.development, null, 2));