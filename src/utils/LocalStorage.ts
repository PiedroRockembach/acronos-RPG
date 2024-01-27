import {User} from "../models/Users";

const USER = "user"

function getUser() : string | null {
    const storage = localStorage.getItem(USER) || null;
    if (!storage) return null;
    return storage;
}

function setUser(user: string) : void {
    localStorage.setItem(USER, user);
}


export default {
    getUser,
    setUser
}