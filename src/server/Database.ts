import {createPool, Pool, PoolConfig, PoolConnection} from 'mysql' // RowDataPacket?

export default class Database {
    
    private readonly pool: Pool

    constructor(callback: (err: any) => void, config?: PoolConfig) {
        try {
            // Create a connection with the details provided in .env, unless different config provided
            if (typeof config === 'undefined') {
                this.pool = createPool({
                    host: process.env.MYSQL_HOST || "localhost",
                    user: process.env.MYSQL_USER || "root",
                    password: process.env.MYSQL_PWD || "password",
                    port: Number(process.env.MYSQL_PORT) || 3306,
                    database: process.env.MYSQL_DB || "foodbutler"
                })
            } else {
                this.pool = createPool(config)
            }

            // Test the connection
            this.getConnection().then(conn => {
                conn.ping((err) => {
                    if (err) { throw err }
                    console.log(`Successfully connected to MySQL database '${conn.config.database}' on ${conn.config.host}:${conn.config.port}`)
                })
                conn.release()
            }).catch(err => { throw err })
        } catch(ex) {
            this.pool = createPool({})
            callback(ex)
        }
    }
    
    // Select query the database, with optional arguments
    public async select(sql: string, args?: any[]): Promise<any[]> {
        return new Promise((resolve, reject) => {
            this.getConnection().then(conn => {
                conn.query(sql, args, (err, results) => { // 'rows' may be a result from a COUNT(*)
                    if (err) {
                        conn.release()
                        console.log(err)
                        reject(err)
                    }
                    console.log(results)
                    resolve(results)
                })
                conn.release() // TODO: Fix conn released called twice on conn error
            }).catch(error => {
                console.log(error)
                reject(error)
            })
        })
    }

    // Get a connection to the MySQL database
    protected async getConnection(): Promise<PoolConnection> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, conn) => {
                if (err) {
                    return reject(err)
                }
                resolve(conn)
            })
        })
    }
}