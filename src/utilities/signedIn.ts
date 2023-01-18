import jwt from "jsonwebtoken";
const signedIn = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE_IN
    })
};

export default signedIn;