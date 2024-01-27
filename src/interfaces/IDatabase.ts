import Table from '@/models/Table';
import { User } from '../models/Users'
export default interface IDatabase {
    _database: unknown
    GetUsers(): Promise<User[]>;
    GetUserByEmail(email: string): Promise<User | null>;
    AddUser(user: User): Promise<User>;
    AddTable(table: Table): Promise<void>;
    FindTables(id: string): Promise<Table[]>;
    FindTableById(id: string): Promise<Table>
}