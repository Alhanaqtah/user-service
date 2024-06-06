import jwt from 'jsonwebtoken';

 export function auth(options) {
    if (!options.secret) {
        throw new Error(`'secret' is required`);
    }

    if (!options.onExpired) {
        options.onExpired = (res) => {
            res.status(401).json({ message: 'Token expired.' });
        }
    }
    
    
    return (req, res, next) => {
        let token;

        let auth = req.get('Authorization');
        if (auth && auth.split(' ')[0] === 'Bearer') {
            token = auth.split(' ')[1]; 
        } else if (req.query.token) {
            token =  req.query.token;
        }

        if (!token) {
            return res.status(401).json({ message: 'No token provided.' });
        }

        jwt.verify(token, this.optinons.secret, { algorithms: ['HS256'] }, (err, decoded) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    this.optinons.onExpired(res);
                } else {
                    return res.status(401).json({ message: 'Invalid token.' });
                }
            }
    
            req.token = decoded;
        });


        next();
    }
}