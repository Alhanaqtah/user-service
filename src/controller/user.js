import {UserExistsError, UserNotFoundError} from '../service/user.js';

export class Controller {
    constructor(service, tokenOptions) {
        this.service = service;
        this.tokenOptions = tokenOptions;
    }

    async get(req, res) {
        try {
            let userID = req.token.sub;

            let user = await this.service.getUserByID(userID);

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({'error': 'Internal error'});
        }
    }

    async getByID(req, res) {
        try {
            let userID = req.params.id;

            let user = await this.service.getUserByID(userID);

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            if (error instanceof UserNotFoundError) {
                return res.status(400).json({'error': 'User not found'});
            }
            return res.status(500).json({'error': 'Internal error'});
        }
    }

    async update(req, res) {
        try {
            let userID = req.token.sub;

            let updatedInfo = req.body;

            await this.service.updateUser(userID, updatedInfo);

            return res.status(200).json({});
        } catch (error) {
            console.error(error);
            if (error instanceof UserExistsError) {
                return res.status(401).json({'error': 'Username already taken'});
            }
            return res.status(500).json({'error': 'Internal error'});
        }
    }

    async remove(req, res) {
        try {
            let userID = req.token.sub;

            await this.service.remove(userID);

            return res.status(200).json({});
        } catch (error) {
            console.error(error.message);
            if (error instanceof UserNotFoundError) {
                return res.status(401).json({'error': 'User not found'});
            }
            return res.status(500).json({'error': 'Internal error'});
        }
    }
}