import React from "react"
import { Button } from 'react-bootstrap';
import { LoginWithPopup } from '../utils/Auth'
import LocalStorage from "@/utils/LocalStorage";
import User from "@/models/User";
import { useRouter } from "next/router";

export default function Login() {
    const router = useRouter();
    const login = async () => {
        const user: User = await LoginWithPopup();
        LocalStorage.setUser(user);
        if(LocalStorage.getUser()) {
            router.push('/')
        }
    }
    return (
        <>
            <h1>fazer login</h1>
            <Button variant="Danger" onClick={ login }>
                Login
            </Button>
        </>
    );
}