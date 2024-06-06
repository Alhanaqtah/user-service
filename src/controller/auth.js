import { UserExistsError } from "../service/auth.js";

export class Controller {
    constructor(service) {
        this.service = service;
    }

    async signup(req, res) {        
        try {
            let {username, email, password} = req.body;
            
            if (!username || !email || !password) {
                return res.status(400).json({'error': 'Invalid credentials'});
            }

            await this.service.signup(username, email, password);

            return res.status(201).json({});
        } catch (error) {
            console.error(error.message)
            if (error === UserExistsError)
                return res.status(400).json({'error': 'User already exists'});
            return res.status(500).json({'error': 'Internal error'});
        }
    };
}