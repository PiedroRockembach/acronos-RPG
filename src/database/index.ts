import db, { auth } from "./Firestore";
import { Firestore, collection, doc, getDoc, query, where, getDocs, setDoc } from "@firebase/firestore";
import {v4 as uuidv4} from 'uuid'

import IDatabase from "@/interfaces/IDatabase";
import { User } from "@/models/Users";
import Table from "@/models/Table";
import TableUser from "@/models/TableUser";


class FirestoreDatabase implements IDatabase {
    _auth = auth
    _database = db; 
    async GetUsers(): Promise<User[]> {
        try {
            const usersRef = collection(this._database, "users");
            const snap = await getDocs(usersRef);
            let users: User[] = [] as User[];
            snap.forEach((document) => {
                users.push(document.data() as User)
            })
            return users;
        } catch(e: any) {
            console.log(e.message)
            return [] as User[];
        }
        
    }
    async GetUserByEmail(email: string): Promise<User | null> {
        const userRef = collection(db, "users");
        const q = query(userRef, where("email", '==', email))
        const snap = await getDocs(q);
        let user: User | null = null;
        snap.forEach((u) => {
            const data = u.data() as User
            if(data.email) {
                user = {
                    email: data.email,
                    name: data.name,
                    google_id: data.google_id,
                    photoURL: data.photoURL
                }
            }  
        })
        return user;
        

    }
    async AddUser(user: User): Promise<User> {
        try {
            console.log('user: ', user);
            
            await setDoc(doc(this._database, "users", user.name!), user)

            return user;
        } catch (e: any) {
            console.log(e.message);
            return user;
            
        }
    }
    
    async AddTable(table: Table): Promise<void> {
        try {
            table.table_id = uuidv4()
            await setDoc(doc(this._database, "tables", table.table_name), table)
            const user = this._auth.currentUser!
            const tableUser:TableUser = {
                table_id:table.table_id,
                user_id: user.uid
            }
            await setDoc(doc(this._database, "table-user", `${table.table_name}-${user.displayName}}`), tableUser)
        } catch (e: any) {
            console.log(e.message); 
        }
    }

    async FindTables(id: string): Promise<Table[]> {
        try {
            const user = this._auth.currentUser!
            const tableRef = collection(this._database, "table-user");
            const q = query(tableRef, where("user_id", '==', user.uid))
            const snap = await getDocs(q);
            let tables: Table[] = [] as Table[];
            snap.forEach((document) => {
                tables.push(document.data() as Table)
            })
            return tables;
        } catch(e: any) {
            console.log(e.message)
            return [] as Table[];
        }
    }

    async FindTableById(id: string): Promise<Table> {
        try {
            const tableref = collection(db, "tables");
        const q = query(tableref, where("table_id", '==', id))
        const snap = await getDocs(q);
        let table: Table | null = null;
        snap.forEach((u) => {
            const data = u.data() as Table
            table = {
                owner_name: data.owner_name,
                table_name: data.table_name,
                table_id: data.table_id,
            }
        })
        console.log(table)
        return table!;
        } catch {
            return {} as Table
        }
    }

}

const firesotoreDatabase = new FirestoreDatabase();

export default firesotoreDatabase;

