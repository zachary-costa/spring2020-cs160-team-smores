// Dependencies
import { Router } from 'express'
// References
import Database from './Database'

export default abstract class Datasource {

    protected readonly db: Database
    protected readonly router: Router
    protected readonly baseRoute: string

    protected constructor(route: string, database: Database, router: Router)
    {
        this.db = database
        this.router = router
        this.baseRoute = route
    }
}