import { Link } from '@tanstack/react-router'
import { BsLayoutThreeColumns } from "react-icons/bs";

const LeftMenu = () => {
   return (
      <div className="h-lvh border-r border-border text-sm text-muted-text bg-card-bg">
         <div className="border-b p-3 pb-4 pt-4">
            <img src="/siro.svg" />
         </div>
         <div className="flex flex-col gap-2.5 pt-6">
            <Link
               className="group relative flex items-center gap-3 p-2.5"
               to="/"
               activeProps={{
                  className: 'active',
               }}
               // activeOptions={{ exact: true }}
            >
               <BsLayoutThreeColumns className="text-primary group-[.active]:relative group-[.active]:z-10 group-[.active]:text-[#FFF]" />
               <span className="z-10 group-[.active]:relative group-[.active]:font-medium group-[.active]:text-[#FFF]">Нүүр</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>

            <Link
               className="group relative flex items-center gap-3 p-2.5"
               to="/about"
               activeProps={{
                  className: 'active',
               }}
               // activeOptions={{ exact: true }}
            >
               <BsLayoutThreeColumns className="text-primary group-[.active]:relative group-[.active]:z-10 group-[.active]:text-[#FFF]" />
               <span className="z-10 group-[.active]:relative group-[.active]:font-medium group-[.active]:text-[#FFF]">Тухай</span>
               <div className="-z-1 ease absolute -left-[160px] top-0 h-full w-full rounded-r-full bg-primary opacity-0 transition-all duration-300 group-[.active]:-left-10 group-[.active]:opacity-100" />
            </Link>
         </div>
      </div>
   )
}

export default LeftMenu
