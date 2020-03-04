// Dependencies
import { Router } from 'express'
// References
import Database from './Database'
import Fridge from './fridge/Fridge'

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
        this.fridge = new Fridge(this.database, this.router)
    }

    private static database: Database
    private static fridge: Fridge
    public static router: Router
}