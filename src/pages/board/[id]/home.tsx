import Header from "@/components/Header";
import { User } from "@/models/Users";
import Jwt from "@/utils/Jwt";
import { useCollection } from "react-firebase-hooks/firestore";
import {  useParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import { collection, query, where } from "@firebase/firestore";
import firesotoreDatabase from "@/database";
import TableUser from "@/models/TableUser";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ITable from "@/models/Table";
export default function Board() {
    const params = useParams<{id: string}>()
    

    const [inviteMessageSent,setInviteMessageSent] = useState(false);
    const [inviteMessageError,setInviteMessageError] = useState(false);
    const [inviteEmail, setInviteEmail] = useState('');
    
    const [players, setPlayers] = useState([] as User[]);
    const [table, setTable]: [any, any] = useState();
    const [user, setUser] = useState({} as User);
    const [loading, setLoading] = useState(true);
    
    const [participants, loadingParticipant, error] = useCollection(query(collection(firesotoreDatabase._database, 'table-user'), where('table_id', '==', params?.id || '')), {
        snapshotListenOptions: { includeMetadataChanges: true}
    }); 

    const addPlayer = async () => {
        setInviteMessageError(false);
        setInviteMessageSent(false);
        const added = await firesotoreDatabase.addPlayerToTable({tableId: params.id, tableName: table.table_name, email: inviteEmail})
        console.log('added', added);
        
        if (!added) return setInviteMessageError(true);
        setInviteMessageSent(true);
    }
    const getParticipants = async() => {
        const currentTable: ITable = await firesotoreDatabase.FindTableById(params.id);
        setTable(currentTable)
        const playerIds: TableUser[] = []
        participants?.forEach((p) => {
            playerIds.push(p.data() as TableUser)
        })
        if (!playerIds) return;
            console.log(playerIds);
            const playersResponse:any = playerIds.map((playerId) => firesotoreDatabase.GetUserById(playerId.user_id));
            await Promise.all(playersResponse).then(data => {
                console.log(data)
                setPlayers(data)
                setLoading(false);
            })
            
            

        
    }
    
    useEffect(() => {
        setUser(Jwt.getUserFromToken()!);
        getParticipants();
    }, [loadingParticipant]);
    return (

        <section className="page board-home">
            <Header name={user.name} photoURL={user.photoURL} page={table.table_name}>
            <Dialog>

                <DropdownMenu>
                    <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem>Adiciona</DropdownMenuItem>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>Convidar Jogadores</DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <DialogTrigger>Email</DialogTrigger>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DialogPortal>
                    <DialogOverlay className="DialogOverlay"/>
                    <DialogContent className="DialogContent">
                        <DialogHeader>
                            <DialogTitle>Adicionar um jogador</DialogTitle>
                            <DialogDescription>Digite abaixo o email do jogador que deseja Adicionar</DialogDescription>
                            <Input placeholder="example@example.com" onChange={(e) => setInviteEmail(e.target.value)}/>
                            {inviteMessageSent && <span style={ {"color": "green"}}>Jogador adicionado com sucesso</span>}
                            {inviteMessageError && <span style={ {"color": "red"}}>Jogador não encontrado</span>}
                            <Button onClick={addPlayer}>Adicionar</Button>
                        </DialogHeader>
                        <DialogFooter>
                        <DialogClose>
                            <Button>Cancelar</Button>  
                        </DialogClose>
                    </DialogFooter>
                    </DialogContent>
                </DialogPortal>
            </Dialog>
            {players.map(player => {
                if(player.google_id != user.google_id) return <Avatar><AvatarImage src={player.photoURL!}/></Avatar>
            }
                
            )}
            </Header>
            <main className="board-main">
                {loading && <div className="lds-dual-ring"></div>}
            </main>
        </section>
    )
}