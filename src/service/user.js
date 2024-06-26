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
    constructor(storage) {
        this.storage = storage;
    }

    async getAll(userID) {
        try {
            let users = await this.storage.getAll();
     
            return users;
        } catch(error) {
            throw error;
        }
    }

    async getUserByID(userID) {
        try {
            let user = await this.storage.getUserByID(userID);
            if (!user) {
                throw new UserNotFoundError();
            }

            return user;
        } catch(error) {
            throw error;
        }
    }

    async updateUser(userID, updatedInfo) {
        try {
            let exists = await this.storage.findByField('username', updatedInfo.username);
            if (exists) {
                throw new UserExistsError();
            }

            exists = await this.storage.findByField('email', updatedInfo.name);
            if (exists) {
                throw new UserExistsError();
            }

            await this.storage.updateUser(userID, updatedInfo);
        } catch (error) {
            throw error;
        }
    }

    async remove(userID) {
        try {
            let exists = await this.storage.findByField('id', userID);
            if (!exists) {
                throw new UserNotFoundError();
            }

            await this.storage.remove(userID);
        } catch (error) {
            throw error;
        }
    }
}