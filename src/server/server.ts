import cors = require('cors')
import env = require('dotenv')
import express = require('express')
import router from './routes'

async function bootstrap() {
    const app = express()
    app.use(cors())
    app.use(router);

    const port = process.env.CLIENT_PORT || 3000

    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`)
    })
}

env.config()
bootstrap()