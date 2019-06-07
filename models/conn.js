const pgp = require('pg-promise') ({
    query: e => {
        console.log('QUERY:', e.query);
    }
})

const options = {
    host: 'localhost',
    database: 'bookreview',
    user: 'bengov'
}

const db = pgp(options);

module.exports = db;