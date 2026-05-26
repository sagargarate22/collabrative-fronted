import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer"

export function SideDrawer({
    side = "right",
    open,
    onOpenChange,
    children,
}: {
  side?: "left" | "right"
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}) {
  return (
    <Drawer direction={side} open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="p-6">
            {children}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
