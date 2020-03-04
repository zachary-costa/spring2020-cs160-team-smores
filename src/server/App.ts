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
        // TODO: Move away from init as behavior in router.get unexpected
        this.router.get('/api/test', async (req, res) => {
            // TODO: correct conversion to json
            await this.database.query("SELECT name,age FROM temp").then(result => {
                console.log(result);
                return result
            })
        })
    }

    private static database: Database
    public static router: Router
}