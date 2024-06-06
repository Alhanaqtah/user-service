import sqlite3 from 'sqlite3';

export class Storage {
    constructor(storagePath) {
        this.db = new sqlite3.Database(storagePath, (err) => {
            if (err) {
                console.error("Failed to init db connection");
                throw new Error("Failed to init db connection: " + err.message);
            }
            
            console.log("Connection to database initialized succesfully");
            this.db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name VARCHAR(100),
                surname VARCHAR(100),
                username VARCHAR(100) UNIQUE NOT NULL,
                pass_hash BLOB NOT NULL,
                email VARCHAR(100) UNIQUE,
                role TEXT DEFAULT 'user',
                is_blocked BOOL DEFAULT false,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                modified_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )`, (err) => {
                if (err) {
                    console.error("Failed to create table: " + err.message);
                } else {
                    console.log("Tables created succesfully");
                }
            });
            
        });
    }

    async findByField(field, value) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT ${field} FROM users WHERE ${field} = ?`, [value], (err, row) => {
                if (err) {
                    console.error(`Failed to find user by ${field}: `, + err.message);
                    reject(err);
                }
                resolve(!!row);
            });
        });   
    }

    async createUser(username, email, passHash) {
        return new Promise((resolve, reject) => {
            this.db.run(`INSERT INTO users (username, email, pass_hash) VALUES (?, ?, ?)`, [username, email, passHash], (err) => {
                if (err) {
                    console.error("Failed to create user: " + err.message);
                    reject(err);
                }
                console.log("User created successfully");
                resolve();
            })
        });
    }

    async getPassHash(username) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT pass_hash FROM users WHERE username = ?`, [username], (err, row) => {
                if (err) {
                    console.error("Failed to get user's pass_hash: " + err.message);
                    reject(err);
                } else if (row) {
                    resolve(row.pass_hash);
                } else {
                    reject(null);
                }
            })
        });
    }

    async userInfo(username) {
        return new Promise((resolve, reject) => {
            this.db.get(`SELECT id, role FROM users WHERE username = ?`, [username], (err, row) => {
                if (err) {
                    console.error("Failed to get user's id, pass_hash: " + err.message);
                    reject(err);
                } else if (row) {
                    resolve({
                        id: row.id,
                        role: row.role,
                    });
                } else {
                    reject(null);
                }
            })
        });
    }
}