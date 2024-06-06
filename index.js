import express from 'express';
import bodyParser from 'body-parser';

import {config} from './src/config/config.js';

import {Storage} from './src/storage/storage.js';

import {Controller as AuthController} from './src/controller/auth.js';
import {Service as AuthService} from './src/service/auth.js';

// import {Controller as UsersController} from './src/controller/user.js';
// import {Service as UsersService} from './src/service/user.js';

import {auth} from './src/midleware/auth.js';

// Storage
let storage = new Storage(config.storagePath);

// Servie
// let usersService = new UsersService(storage);
let authService = new AuthService(storage, config.jwt);

// Controller
// let usersController = new UsersController(usersService);
let authController = new AuthController(authService);

const app = express();

app.use(bodyParser.json());
app.use('/users', auth({
    secret: config.jwt.secret,
    onExpired: (res) => {
        res.redirect("/auth/login");
      },
}))

app.get('/healthcheck', (req, res) => {
    res.sendStatus(200);
});

app.post('/auth/signup', authController.signup.bind(authController));

app.post('/auth/login', authController.login.bind(authController));

// app.get('/users/me', usersController.get);

// app.get('/users/:id', usersController.getByID);

// app.patch('/users/me', usersController.update);

// app.delete('/users/me', usersController.remove)

app.listen(config.port, () => {
    console.log(`Server is running on port '${config.port}'`);
})