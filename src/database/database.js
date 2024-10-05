const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',         
    password: '',         
    database: 'electiva', 
    port:3306
}); 
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos como ID ' + connection.threadId);
});

module.exports = connection;
