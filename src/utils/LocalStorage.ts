import {User} from "../models/Users";
import React from "react";

const USER = "user"


function getUser() : string | null {
    if (typeof window !== 'undefined') {
        const storage = localStorage.getItem(USER) || null;
        if (!storage) return null;
        return storage;
    }
    return null
}

function setUser(user: string) : void {
    localStorage.setItem(USER, user);
}

function Clear() {
    localStorage.clear();
}
export default {
    getUser,
    setUser,
    Clear,
}