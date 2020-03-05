// Dependencies
import { Router } from 'express'
// References
import Database from './Database'
import Storage from './storage/Storage'

// Wrapper for all endpoints (allows easily adding redis or 3rd party apis)
export default class App {
    // Initializer to be ran at server startup
    public static initialize() {
        // Initialize database connection
        this.database = new Database((err) => {
            console.log(err)
            process.exit()
        })
        // Empty router object
        this.router = Router()
        this.storage = new Storage(this.database, this.router)
    }

    private static database: Database
    private static storage: Storage
    public static router: Router
}