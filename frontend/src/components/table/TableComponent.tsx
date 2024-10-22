import { TableBody, Table } from '../ui/table'
import TableRowComponent from './TableRowComponent'
import TableHeaderComponent from './TableHeaderComponent'
import { User } from '@/pages/admin/components/adminUsersPage'
import { Service } from '@/store/useServiceStore'

interface TableComponentProps<T extends User | Service> {
    data: T[]
    columns: string[]
    onEdit: (item: T) => void
    onDelete: (itemId: string) => void
}

const TableComponent = <T extends User | Service>({
    data,
    columns,
    onEdit,
    onDelete,
}: TableComponentProps<T>) => {
    return (
        <Table className='mt-8'>
            <TableHeaderComponent columns={columns} />
            <TableBody>
                {data.map((rowData, index) => (
                    <TableRowComponent
                        key={index}
                        rowData={rowData}
                        columns={columns}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </TableBody>
        </Table>
    )
}

export default TableComponent
