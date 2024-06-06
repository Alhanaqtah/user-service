export class Service {
    constructor(storage) {
        this.storage = storage;
    }

    async getUserByID(userID) {
        try {
            let user = await this.storage.getUserByID(userID);

            return user;
        } catch(error) {
            throw error;
        }
    }
}