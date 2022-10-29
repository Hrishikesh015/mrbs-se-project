// TODO include dotenv module for processing .env file
const express = require('express')
const connectDb = require('./config/db')

connectDb()

const app = express()

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
// TODO make a .env file
const PORT = 5000 // make it process.env.PORT later

const server = app.listen(PORT, () => console.log(`app running on ${PORT}`));

process.on("unhandledRejection", (err, promise) => {
    console.log(`Logged Error: ${err}`)
    server.close(() => process.exit(1))
})