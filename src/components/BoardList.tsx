import { useRouter } from 'next/router'
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
    TableCell,
    TableHead

} from '../components/ui/table'
import ITable from '../models/Table'
import { Button } from './ui/button'
type BoardListProp = {
    boards: ITable[]
}
export default function BoardList({ boards}: BoardListProp){
    const router = useRouter();
    return(
    <section className='board-list'>
        <Table className='board-table'>
            <TableHeader>
                <TableHead>Nome</TableHead>
                <TableHead>criador</TableHead>
                <TableHead></TableHead>
            </TableHeader>
            <TableBody>
                {
                    boards.map((b) => {
                        return (
                            <TableRow key={ b.table_id }>
                                <TableCell>{b.table_name}</TableCell>
                                <TableCell>{b.owner_name}</TableCell>
                                <TableCell onClick={() => router.push(`/board/${b.table_id}/home`)}><Button>Entrar</Button></TableCell>
                            </TableRow>
                        )
                        
                    })
                }
            </TableBody>
        </Table>
    </section>
    )
}