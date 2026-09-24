const jwt= require("jsonwebtoken");

function authMiddleware(req,res,next){
    //Get authorization header
    const authHeader=req.headers.authorization;

    //check heather token exists
    if(!authHeader || !authHeader.startsWith("Bearer")){
        return res.status(401).json({
            message:"Authentication required",
        });
    }

    //Extract token
    const token=authHeader.split(" ")[1];

    try {
        
        //verify token
        const decoded=jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        //store decoded user information
        req.user=decoded;

        //continue to next function

        next();

    } catch (err) {
        console.error("JWT verify failed:", err.name, "-", err.message);   // add this line
        return res.status(401).json({
            message:"Invalid or expired token",
        });    
    }
}

module.exports= authMiddleware;