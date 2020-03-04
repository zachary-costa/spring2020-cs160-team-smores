// Dependencies
import { Router } from 'express'
// References
import Database from './Database'

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
    }

    private static database: Database
    public static router: Router
}