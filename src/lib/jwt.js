import jwt from 'jsonwebtoken';

export function generateToken(userInfo, tokenInfo) {
    let token = jwt.sign(
        {
            sub: userInfo.id,
            role: userInfo.role,
        },
        tokenInfo.secret,
        {
            expiresIn: Number(tokenInfo.expiration)
        }
    );
    return token;
}