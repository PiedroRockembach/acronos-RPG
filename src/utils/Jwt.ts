import jwt from "jsonwebtoken";
import { User } from "../models/Users";
import LocalStorage from "./LocalStorage";

const PRIVATE_KEY = process.env.PRIVATE_KEY || "nevergonnagiveyouupnevergonnaletyoudown"
 function SignToken(user: User): string | null {
    try {
       const token = jwt.sign(user, PRIVATE_KEY);
       return token;
    } catch (e: any) {
        console.log(e.message);
        
        return null
    }
}

 function verifyToken(token: string): User | null {
    try {
        const user = jwt.verify(token, PRIVATE_KEY) as User;
        return user;
    } catch(e) {
        return null;
    }
}

function getUserFromToken(): User | null {
     if(typeof window !== 'undefined') {
        const token = LocalStorage.getUser()
        return verifyToken(token!);
    }
    return null
    
}
export default {
    SignToken,
    verifyToken,
    getUserFromToken,

}