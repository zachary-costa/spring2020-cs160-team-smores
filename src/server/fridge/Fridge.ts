// Dependencies
import {Router, Request, Response} from 'express'
// References
import Datasource from '../Datasource'
import Database from '../Database'

export default class Fridge extends Datasource {

    public constructor(database: Database, router: Router) {
        super("/fridge", database, router)
        // Map the router endpoints to handler methods
        router.get(`${this.baseRoute}/test`, (request, response) => this.getTest(request, response))
    }

    private async getTest(request: Request, response: Response)
    {
        // TODO: handle error
        await this.db.select("SELECT name,age FROM temp").then(result => {
            response.send(result)
        })
    }
}