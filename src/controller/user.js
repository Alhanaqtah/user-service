import jwt from 'jsonwebtoken';

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

}