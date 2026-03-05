const dotenv = require('dotenv')

dotenv.config()

const config ={
    HOST: process.env.HOST,
    PORT: process.env.PORT,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    JWT_SECRET: process.env.JWT_SECRET,
    DB_TIMEZONE: process.env.DB_TIMEZONE,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    COOKIE_NAME: process.env.COOKIE_NAME
}

module.exports={config}