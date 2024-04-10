import { createFileRoute } from '@tanstack/react-router';
import { Header, Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/custom';
export const Route = createFileRoute('/_dashboard/notification/')({
   beforeLoad: () => ({ breadcrumbs: [{ title: 'Мэдэгдэл', toLink: '/notification' }] }),
   component: AboutPage,
});

function AboutPage() {
   // const { control } = useForm({ mode: 'onChange', defaultValues: { checked: true } })

   return (
      <>
         <Header title="Мэдэгдэл" />

         <Tabs defaultValue="account" className="w-[400px]">
            <TabsList>
               <TabsTrigger value="account">email</TabsTrigger>
               <TabsTrigger value="password">sms</TabsTrigger>
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
         </Tabs>
      </>
   );
}
