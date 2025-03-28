const mysql = require('mysql2');
const db_creds = {
    host: 'LAPTOP-R604O2UQ',
    user: 'baodang',
    password: 'Pepicase123!',
    database: 'testdb'
}

const query = (query) => {
    let connection = mysql.createConnection(db_creds);
    connection.query(query, (err, res) => {
        connection.end();
        if(err) return err;
        else {
            console.log(res);
            return res;
        }
    });
}
console.log(query('SELECT * FROM users'));
//module.exports = query;