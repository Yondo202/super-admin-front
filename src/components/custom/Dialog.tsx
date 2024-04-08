import { DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from '@radix-ui/react-dialog';

type TDialogProps = {
   children: React.ReactNode;
   title?: string;
   isOpen: boolean;
   onOpenChange: (open: boolean) => void;
};

const Dialog = ({ children, title, isOpen, onOpenChange }: TDialogProps) => {
   return (
      <DialogPrimitive.Root onOpenChange={onOpenChange} open={isOpen}>
         {/* <DialogTrigger>Open</DialogTrigger> */}
         <DialogContent>
            <DialogHeader>
               <DialogTitle>{title}</DialogTitle>
               {/* <DialogDescription>This action cannot be undone. This will permanently delete your account and remove your data from our servers.</DialogDescription> */}
            </DialogHeader>
            <div className='max-h-[80dvh] overflow-y-auto p-6 pb-0 relative'>{children}</div>
         </DialogContent>
      </DialogPrimitive.Root>
   );
};

export default Dialog;
