import { Link } from '@tanstack/react-router';
import { Dashboard, Notif } from '@/assets/svg';

const LeftMenu = () => {
   return (
      <div className="h-lvh border-r border-border text-sm text-muted-text bg-card-bg">
         <div className="border-b p-3 pb-4 pt-4">
            <img src="/siro.svg" />
         </div>
         <div className="flex flex-col gap-5 pt-6">
            <Link
               className="group relative flex items-center gap-3 p-3 py-1 text-xs2 border-l-2"
               to="/stores"
               activeProps={{
                  className: 'active border-primary',
               }}
               preload="intent"
            >
               <Dashboard className="fill-text group-[.active]:relative group-[.active]:z-10 group-[.active]:fill-primary" />
               <span className="z-10 group-[.active]:relative group-[.active]:font-medium group-[.active]:text-primary">Вэбийн жагсаалт</span>
               {/* <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary/10 opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" /> */}
            </Link>

            <Link
               className="group relative flex items-center gap-3 p-3 py-1 text-xs2  border-l-2"
               to="/notification"
               activeProps={{
                  className: 'active border-primary',
               }}
               // activeOptions={{ exact: true }}
            >
               <Notif className="fill-text group-[.active]:relative group-[.active]:z-10 group-[.active]:fill-primary" />
               <span className="z-10 group-[.active]:relative group-[.active]:font-medium group-[.active]:text-primary">Мэдэгдэл</span>
               {/* <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary/10 opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" /> */}
            </Link>
         </div>
      </div>
   );
};

export default LeftMenu;
