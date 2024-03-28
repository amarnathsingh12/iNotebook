var jwt = require('jsonwebtoken');
const JWT_SECRET = "amar is a good boy";

// export default function fetchuser(req, res, next){
//     // Get the user from the jwt token and add id to req object
//     const token = req.header('auth-token');
//     if(!token){
//         res.status(401).send({error: "Please authenticate using a valid token"})
//     }
//     try {
//         const data = jwt.verify(token, JWT_SECRET);

//         // console.log("first", req)

//         req.user = data.user;

//         // console.log("second", req)
//         next();
//     } catch (error) {
//         res.status(401).send({error: "Please authenticate using a valid token"})
//     }
// }

const fetchuser = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);

        // console.log("first", req)

        req.user = data.user;

        // console.log("second", req)
        next();
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"})
    } 
}

module.exports = fetchuser;