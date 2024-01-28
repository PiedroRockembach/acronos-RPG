import Header from '../components/Header'
import React, { useEffect, useState } from 'react'
import Jwt from '../utils/Jwt'
import { User } from '../models/Users';
import ITable from '../models/Table'
import firesotoreDatabase from '../database'
import { useCollection } from 'react-firebase-hooks/firestore'
import { collection, query, orderBy, where } from '@firebase/firestore';
import { User as IUser } from '@firebase/auth';
import BoardList from '../components/BoardList'

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from '../components/ui/dropdown-menu'


import { Dialog, DialogContent,DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogPortal, DialogOverlay, DialogClose, DialogFooter} from '../components/ui/dialog'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Button } from '../components/ui/button'

export default function Lobby() {
    const [user, setUser] = useState({} as User);
    const [tableName, setTableName] = useState('');
    const [nameError, setNameError] = useState(false);
    const [tables, setTables] = useState([] as ITable[]);

    const [tablesSnapshot, loadingTables, error] = useCollection(query(collection(firesotoreDatabase._database, 'table-user'), where('user_id', '==', Jwt.getUserFromToken()?.google_id)), {
        snapshotListenOptions: { includeMetadataChanges: true}
    } )
    const createTable = async () => {
        const newTable: ITable = {
            table_name: tableName,
            owner_name: user.name!,
        }
        await firesotoreDatabase.AddTable(newTable);
    }
    const handleForm = ({target}: any) => {
        console.log(target.value)
        setTableName(target.value)
        setNameError(target.value.length < 3)
    }

    const updateTables = async () => {
        let promisseTables:any = [];
        tablesSnapshot?.forEach((t) => {
            
            promisseTables.push(t.data())
        })
       const loadedTables = await Promise.all(promisseTables);
       const newTables:any = []
       for(let i = 0; i< loadedTables.length; i+= 1) {
            const awaited: any = await firesotoreDatabase.FindTableById(loadedTables[i].table_id)
            newTables[i] = awaited
       }
       console.log(newTables);
       
       setTables(newTables);
       
    }
    useEffect(() => {
        updateTables();
    }, [tablesSnapshot])

    useEffect(() => {
        setUser(Jwt.getUserFromToken()!)
        
        updateTables();
    }, []);
    
    return (
        <section className='lobby page'>
        <Header name={ user.name! } email={ user.email } photoURL={ user.photoURL!} page="Mesas">
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Gerencie suas mesas</DropdownMenuLabel>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DialogTrigger>
                        <DropdownMenuItem>Criar Mesa</DropdownMenuItem>
                    </DialogTrigger>
                </DropdownMenuContent>
            </DropdownMenu>
        
            <DialogPortal>
                <DialogOverlay className="DialogOverlay"/>
                <DialogContent className="DialogContent">
                    <DialogHeader>
                        <DialogTitle>Crie sua Mesa</DialogTitle>
                        <DialogDescription>Crie uma mesa para jogar com seus amigos.<br/> Perceba que ao ser o criador da mesa você assumirá o papel de mestre</DialogDescription>
                        <div>
                            <Label htmlFor='table-name'>Escolha um nome para a mesa</Label>
                            <Input id='table-name' onChange={(e) => handleForm(e)}/>
                            {nameError && <span className='text-red-500'>O nome deve ter ao menos 3 caracteres</span>}
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <DialogClose>
                            <Button disabled={nameError} onClick={createTable}>Criar</Button>  
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </DialogPortal>
        </Dialog>
        </Header>
        {
            !loadingTables && <BoardList boards={tables} />
        }
            
     
        </section>
    );
}