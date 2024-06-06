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
}