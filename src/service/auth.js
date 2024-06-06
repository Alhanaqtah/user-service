import bcrypt from 'bcryptjs';

import * as jwt from '../lib/jwt.js';

export class UserExistsError extends Error {
    constructor(message = "User already exists") {
        super(message);
        this.name = "UserExistsError";
    }
};

export class UserNotFoundError extends Error {
    constructor(message = "User not found") {
        super(message);
        this.name = "UserNotFound";
    }
}

export class Service {
    constructor(storage, tokenOptions) {
        this.storage = storage;
        this.tokenOptions = tokenOptions;
    }

    async signup(username, email, password) {
        try {
            let exists = await this.storage.findByField('username', username);
            if (exists) {
                throw new UserExistsError;
            }

            exists = await this.storage.findByField('email', email);
            if (exists) {
                throw new UserExistsError;
            }

            const passHash = await bcrypt.hash(password, 10);

            await this.storage.createUser(username, email, passHash);

            return;
        } catch (error) {
            console.error(error.message);
            throw error;
        }
    }

    async login(username, password) {
        try {
            let exists = await this.storage.findByField('username', username);
            if (!exists) {
                throw new UserNotFoundError();
            }
    
            let passHash = await this.storage.getPassHash(username);
            if (!passHash) {
                console.log(`Cannot find user with username: ${username}`);
                throw new UserNotFoundError();
            }
    
            let match = await bcrypt.compare(password, passHash);
            if (!match) {
                console.log(`User's password don't match`);
                throw new UserNotFoundError();
            }
    
            let userInfo = await this.storage.userInfo(username);
    
            let token = jwt.generateToken(userInfo, this.tokenOptions);
    
            return token;
        } catch (error) {
            console.error("Error in login method:", error.message);
            throw error;
        }
    }   
}