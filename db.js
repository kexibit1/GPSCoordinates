const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'postgres',
    password: '15171428Lee',
    host: '127.0.0.1',
    port: '5432',
    database: 'GPSCoordinates'
})

module.exports = pool;