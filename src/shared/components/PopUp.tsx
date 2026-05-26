import {
  Dialog
} from "@/components/ui/dialog"

export function PopUp({
    open,
    onOpenChange,
    children,
}:{
    open: boolean
    onOpenChange: (open: boolean) => void
    children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
        {children}
    </Dialog>
  )
}
