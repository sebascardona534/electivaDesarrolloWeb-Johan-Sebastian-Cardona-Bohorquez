const mysql = require('mysql2');

// Configura tu conexión a MySQL
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'electiva',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const promisePool = pool.promise();

class UserRepository {

    // Simulación de la búsqueda de un usuario por cédula
    async findByDocumentNumber(documentNumber) {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE documentNumber = ?', [documentNumber]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Simulación de la búsqueda de un usuario por nombre de usuario
    async findByUsername(username) {
        const [rows] = await promisePool.query('SELECT * FROM users WHERE username = ?', [username]);
        return rows.length > 0 ? rows[0] : null;
    }

    // Crear un nuevo usuario
    async createUser(user) {
        const { fullName, lastname, documentType, documentNumber, email, phone, username, password } = user;

        // Verificar si el documento o el usuario ya existen
        const existingUserByDocument = await this.findByDocumentNumber(documentNumber);
        const existingUserByUsername = await this.findByUsername(username);

        if (existingUserByDocument) {
            throw new Error('El número de documento ya está en uso.');
        }

        if (existingUserByUsername) {
            throw new Error('El nombre de usuario ya está en uso.');
        }

        try {
            const [result] = await promisePool.query(
                `INSERT INTO users (fullName, lastname, documentType, documentNumber, email, phone, username, password) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [fullName, lastname, documentType, documentNumber, email, phone, username, password]
            );
            return { id: result.insertId, ...user };
        } catch (err) {
            throw new Error('Error al crear el usuario: ' + err.message);
        }
    }
}

module.exports = new UserRepository();
