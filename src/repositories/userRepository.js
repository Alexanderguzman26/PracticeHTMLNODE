const db = require('../database/database');

class UserRepository {
    async findByDocumentNumber(documentNumber) {
        console.log(documentNumber);
        const [rows] = await db.query('SELECT * FROM users WHERE documentNumber = ?', [documentNumber]);
        return rows.length > 0 ? rows[0] : null;
    }

    async findByUsername(username) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            console.error("Ocurrió un error en la consulta:", error.code);
            console.error("Mensaje de error:", error.message);
            throw error;
        }
    }

    async registerUser(user) {
        const { fullName, documentType, documentNumber, email, phone, username, password } = user;
        
        // Usar this para llamar a findByDocumentNumber
        const existingUser = await this.findByDocumentNumber(documentNumber);
        if (existingUser === null) {
            try {
                const [result] = await db.query(
                    `INSERT INTO users (fullName, documentType, documentNumber, email, phone, username, password) 
                    VALUES (?, ?, ?, ?, ?, ?, ?)`,
                    [fullName, documentType, documentNumber, email, phone, username, password]
                );
                return { id: result.insertId, ...user };
            } catch (err) {
                console.error("Error registrando usuario:", err.message);
                throw new Error("Error al registrar el usuario. Inténtalo de nuevo.");
            }
        } else {
            throw new Error("Usuario ya existente.");
        }
    }
}

module.exports = new UserRepository();
