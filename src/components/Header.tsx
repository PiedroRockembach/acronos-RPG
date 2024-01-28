import LocalStorage from "@/utils/LocalStorage";
import React, { ReactNode, useEffect, useState} from "react"

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
import { DropdownMenu, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuPortal } from '../components/ui/dropdown-menu'
import { useRouter } from "next/router";
type HeaderProps = {
    name: string,
    email: string,
    photoURL: string,
    page: string,
}

export default function Header(props: any & HeaderProps) {
    const router = useRouter();
    const { page, name, email, photoURL } = props
    const children = props.children
    return(
        <header className="component-header">
            <nav className="component-header-nav">
            {children}
            </nav>
            <div>{page}</div>
            
            <div className="component-header-profile">
            <span>{name}</span>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar>
                        <AvatarImage src={ photoURL } className="component-header-profile-img" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => {LocalStorage.Clear(); router.push('/')} }>Logout</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            </div>

        </header>
    )
}