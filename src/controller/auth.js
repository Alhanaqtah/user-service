import { UserExistsError, UserNotFoundError } from "../service/auth.js";

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
            console.error(error.message);
            if (error === UserExistsError)
                return res.status(400).json({'error': 'User already exists'});
            return res.status(500).json({'error': 'Internal error'});
        }
    };

    async login(req, res) {
        try {
            let { username, password} = req.body;

            if (!username || !password) {
                return res.status(400).json({'error': 'Invalid credentials'});
            }

            let token = await this.service.login(username, password);
            
            return res.status(200).json({'accessToken': token});
        } catch (error) {
            console.error(error);
            if (error instanceof UserExistsError)
                return res.status(400).json({'error': 'User already exists'})

            if (error instanceof UserNotFoundError)
                return res.status(400).json({'error': 'User not found'})
            return res.status(500).json({'error': 'Internal error'}); 
        }
    }
}