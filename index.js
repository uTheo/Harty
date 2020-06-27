const { Harty } = require('./src/Harty')
require('dotenv').config()
const client = new Harty(process.env.TOKEN, {
    prefix: process.env.BOT_PREFIX
})
client.start()