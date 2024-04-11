import { createFileRoute } from '@tanstack/react-router';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/custom';
import { TiMessages } from 'react-icons/ti';
import { VscMail } from 'react-icons/vsc';
import EmailConfig from '@/components/notification/EmailConfig';
import MessegeConfig from '@/components/notification/MessegeConfig';

export const Route = createFileRoute('/_dashboard/notification/')({
   beforeLoad: () => ({ breadcrumbs: [{ title: 'Мэдэгдэл', toLink: '/notification' }] }),
   component: AboutPage,
});

function AboutPage() {
   // const [ current, setCurrent ] = useState('email') //mainconfig
   // const { control } = useForm({ mode: 'onChange', defaultValues: { checked: true } })

   return (
      <>
         {/* <Header title="Мэдэгдэл" /> */}

         <Tabs defaultValue={items?.at(0)?.key} className="w-full pt-5">
            <TabsList>
               {items.map((element, index) => {
                  return (
                     <TabsTrigger className="flex items-center gap-2.5" key={index} value={element.key}>
                        {element.icon} {element.label}
                     </TabsTrigger>
                  );
               })}
            </TabsList>
            {items.map((Element, index) => {
               return (
                  <TabsContent key={index} value={Element.key}>
                     <Element.Component />
                  </TabsContent>
               );
            })}
         </Tabs>
      </>
   );
}

const items = [
   {
      label: 'E-мэйл',
      key: 'email',
      icon: <VscMail className="text-lg" />,
      Component: EmailConfig,
   },
   {
      label: 'Мессеж',
      key: 'message',
      icon: <TiMessages className="text-lg" />,
      Component: MessegeConfig,
   },
];
