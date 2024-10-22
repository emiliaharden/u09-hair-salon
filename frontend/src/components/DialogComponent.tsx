import { Button } from './ui/button'
import { Dialog, DialogContent, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog'
import { useState } from 'react'

interface DialogComponentProps {
    title?: string
    description?: string
    triggerText: React.ReactNode
    children?: React.ReactNode
    onConfirm: () => void
    confirmText?: string
    cancelText?: string
    isDeleteConfirmation?: boolean
}

const DialogComponent: React.FC<DialogComponentProps> = ({
    title,
    description,
    triggerText,
    children,
    onConfirm,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    isDeleteConfirmation = false,
}) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleConfirm = () => {
        onConfirm()
        setIsDialogOpen(false)
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button onClick={() => setIsDialogOpen(true)} variant="default">
                        {triggerText}
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogDescription>{description}</DialogDescription>
                    <>{isDeleteConfirmation ? null : children}</>
                    <div className="mt-4 flex justify-end space-x-2">
                        <Button variant={isDeleteConfirmation ? 'destructive' : 'default'} onClick={handleConfirm}>
                            {confirmText}
                        </Button>
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                            {cancelText}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default DialogComponent
