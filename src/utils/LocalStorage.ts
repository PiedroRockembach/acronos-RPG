import User from "../models/User";

const USER = "user"

function getUser() : User | null {
    const storage = localStorage.getItem(USER);
    if (!storage) return null;
    return JSON.parse(storage);
}

function setUser(user: User) : void {
    localStorage.setItem(USER, JSON.stringify(user));
}


export default {
    getUser,
    setUser
}