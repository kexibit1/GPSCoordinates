const pg = require('pg');

const { Client } = require('pg')
const client = new Client({
    user: 'postgres',
    host: '127.0.0.1',
    database: 'dmitry',
    password: '15171428Lee',
    port: 5432,
})
client.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


client.query('SELECT * FROM test_db', (err, res) => {
    if (err) console.log(err);
    console.log(res.rows);
    client.end();
})