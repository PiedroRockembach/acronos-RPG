import LocalStorage from "@/utils/LocalStorage";
import React, { ReactNode, useEffect, useState } from "react"

import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar'
type HeaderProps = {
    name: string,
    email: string,
    photoURL: string,
    page: string,
}

export default function Header(props: any & HeaderProps) {
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
            <Avatar>
                <AvatarImage src={ photoURL } className="component-header-profile-img" />
                <AvatarFallback></AvatarFallback>
            </Avatar>
            </div>

        </header>
    )
}