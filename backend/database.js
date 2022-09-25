const mysql = require('mysql2/promise');
require('dotenv').config();

class DB {
    constructor() {
        this.connect();
        setInterval(() => this.connection.query('SELECT 1'), 30000);
    }

    async connect() {
        this.connection = await mysql.createPool({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: "hackDFW",
            
        });
        console.log('Connected to database');
    }

    async query(query, params) {
        const [data] = await this.connection.query(query, params) 
        return data;
    }

    async keepAlive() { 
        this.connection.getConnection((err, connection) => {
            if(err) { console.error('mysql keepAlive err', err); return; }
            connection.ping();
            connection.release();
        });
    }
}


module.exports = DB;
