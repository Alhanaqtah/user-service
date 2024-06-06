import bcrypt from 'bcryptjs';

export const UserExistsError = new Error("User already exists");

export class Service {
    constructor(storage) {
        this.storage = storage;
    }

    async signup(username, email, password) {
        try {
            let exists = await this.storage.findByField('username', username);
            if (exists) {
                throw UserExistsError;
            }

            exists = await this.storage.findByField('email', email);
            if (exists) {
                throw UserExistsError;
            }

            const passHash = await bcrypt.hash(password, 10);

            await this.storage.createUser(username, email, passHash);

            return;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }
}