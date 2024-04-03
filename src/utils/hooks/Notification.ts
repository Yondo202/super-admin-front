import { toast } from 'sonner'

const Notification = (message: string, type?: 'error' | 'success' | 'info'): void => {
   if (type === 'error') {
      toast?.error(message)
   } else {
      toast.success(message)
   }
}

export default Notification
