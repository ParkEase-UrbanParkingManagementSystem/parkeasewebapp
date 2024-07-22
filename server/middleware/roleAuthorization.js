const authorizeRole = (roles) => {
   
    return (req, res, next) => {
        // console.log("Role Authorization Middleware Invoked");
        // console.log("Required roles:", roles);
        // console.log("User role:", req.role);
        
        if (!roles.includes(req.role)) {
            return res.status(403).json("You do not have the required role");
        }
        next();
    };
};

module.exports = authorizeRole;





