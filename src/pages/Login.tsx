import React, { useEffect } from "react"
import { Button } from '../components/ui/button'
import { LoginWithPopup } from '../utils/Auth'
import LocalStorage from "@/utils/LocalStorage";
import { User } from "@/models/Users";
import { useRouter } from "next/router";
import Jwt from "@/utils/Jwt";

export default function Login() {
    const router = useRouter();
    const login = async () => {
        const user: User | null = await LoginWithPopup();
        if(!user) return;
        
        const token: string | null = Jwt.SignToken(user)
        
        LocalStorage.setUser(token!);
        router.push('/')
    }
    return (
        <section className="login page">
            
            <Button variant="destructive" onClick={ login }>
                Login Com Google
            </Button>
        </section>
    );
}