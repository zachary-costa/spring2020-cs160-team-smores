// Dependencies
import cors = require('cors')
import env = require('dotenv')
import express = require('express')
import path = require('path')
// References
import App from './App'
// Bootstrapper to initialize the application
async function bootstrap() {
    App.initialize()
    const publicDir = path.join(__dirname, "../", process.env.PUBLIC_DIR || "public")
    const app = express()
    app.use(cors())
    app.use(App.router);
    app.use(express.static(publicDir))

    const port = process.env.CLIENT_PORT || 3000

    app.listen(port, () => {
        console.log(`Server is listening on port: ${port}`)
    })
}

env.config()
bootstrap()