import { expressjwt } from "express-jwt";

function authJwt() {
    
    const secret = process.env.SECRET_JWT_STRING;
    const api = process.env.API_URL;
    
    
    return expressjwt({
        secret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ["GET", "OPTIONS"]},
            `${api}/users/login/`,
            `${api}/users/register/`,
        ]
    })
}

async function isRevoked(req, jwt) {
    const payload = jwt.payload
    if (!payload.isAdmin) {
      return true
    }
    return false
}


export default authJwt