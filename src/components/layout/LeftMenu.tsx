import { Link } from '@tanstack/react-router';
import { PiUserSwitchLight } from 'react-icons/pi';
import { CiCircleList } from 'react-icons/ci';

const LeftMenu = () => {
   return (
      <div className="h-lvh border-r border-border text-sm text-muted-text bg-card-bg">
         <div className="border-b p-3 pb-4 pt-4">
            <img src="/siro.svg" />
         </div>
         {/* <div className="flex flex-col gap-2.5 pt-6">
            <Link
               className="group relative flex items-center gap-3 p-2.5 text-xs2"
               to="/stores"
               activeProps={{
                  className: 'active',
               }}
               preload="intent"
            >
               <CiCircleList className="text-xl text-primary group-[.active]:relative group-[.active]:z-10 group-[.active]:text-[#FFF]" />
               <span className="z-10 group-[.active]:relative group-[.active]:text-[#FFF]">Вэбийн жагсаалт</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>

            <Link
               className="group relative flex items-center gap-3 p-2.5 text-xs2"
               to="/about"
               activeProps={{
                  className: 'active',
               }}
               // activeOptions={{ exact: true }}
            >
               <PiUserSwitchLight className="text-xl text-primary group-[.active]:relative group-[.active]:z-10 group-[.active]:text-[#FFF]" />
               <span className="z-10 group-[.active]:relative group-[.active]:text-[#FFF]">Хэрэглэгчид</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>
         </div> */}
         <div className="flex flex-col gap-2.5 pt-6">
            <Link
               className="group relative flex items-center gap-3 p-2.5 text-xs2"
               to="/stores"
               activeProps={{
                  className: 'active',
               }}
               preload="intent"
            >
               <CiCircleList className="text-xl text-muted-text group-[.active]:relative group-[.active]:z-10 group-[.active]:text-primary" />
               <span className="z-10 group-[.active]:relative group-[.active]:text-primary">Вэбийн жагсаалт</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary/10 opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>

            <Link
               className="group relative flex items-center gap-3 p-2.5 text-xs2"
               to="/about"
               activeProps={{
                  className: 'active',
               }}
               // activeOptions={{ exact: true }}
            >
               <PiUserSwitchLight className="text-xl text-muted-text group-[.active]:relative group-[.active]:z-10 group-[.active]:text-primary" />
               <span className="z-10 group-[.active]:relative group-[.active]:text-primary">Хэрэглэгчид</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary/10 opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>
         </div>
      </div>
   );
};

export default LeftMenu;
