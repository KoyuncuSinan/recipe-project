import jwt from "jsonwebtoken";

export const verifyToken = async(req,rest,next) => {
    try{
        let token = req.header("Authorization");

        if(!token){
            return rest.status(403).send("Access Denied");
        }

        if(token.startsWith("Bearer ")){
            token = token.slice(7,token.length).trim();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch(err){
        rest.status(500).json({error: err.message});
    }
}