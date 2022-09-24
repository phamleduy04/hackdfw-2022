const mysql = require('mysql2/promise');
require('dotenv').config();

class DB {
    constructor() {
        this.connect();
    }

    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.HOST,
            user: process.env.USERNAME,
            password: process.env.PASSWORD,
            database: "hackDFW"
        });
        console.log('Connected to database');
    }

    async get(query) {
        const [data] = await this.connection.query(query);
        return data;
    }
}


module.exports = DB;