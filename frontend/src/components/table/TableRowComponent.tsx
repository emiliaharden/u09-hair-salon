import { TableCell, TableRow } from '../ui/table'
import Actions from './Actions'
import { User } from '@/pages/admin/components/adminUsersPage'
import { Service } from '@/store/useServiceStore'

interface TableRowProps<T> {
    rowData: T
    columns: string[]
    onEdit: (item: T) => void
    onDelete: (itemId: string) => void
}

const TableRowComponent = <T extends User | Service>({
    rowData,
    columns,
    onEdit,
    onDelete,
}: TableRowProps<T>) => {
    return (
        <TableRow>
            {columns.map((column, index) => (
                <TableCell key={index}>{(rowData as any)[column] || 'N/A'}</TableCell>
            ))}
            <TableCell>
                <Actions
                    rowData={rowData as User | Service}
                    onEdit={(item) => onEdit(item as T)}
                    onDelete={() => onDelete((rowData as any)._id)}
                />
            </TableCell>
        </TableRow>
    )
}

export default TableRowComponent
