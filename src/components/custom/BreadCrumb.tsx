import React from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Link } from '@tanstack/react-router';
import { IoHomeOutline } from 'react-icons/io5';
import { TBreadCrumb } from '@/routes/__root';
import { LiaSlashSolid } from "react-icons/lia";
type TBreadCrumbProps = {
   pathList: TBreadCrumb[];
};

const BreadCrumb = ({ pathList }: TBreadCrumbProps) => {
   if (pathList.length === 0) {
      return null;
   }
   
   return (
      <Breadcrumb className="py-3" >
         <BreadcrumbList>
            <BreadcrumbItem>
               <Link to="/">
                  <IoHomeOutline />
               </Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator ><LiaSlashSolid className="-rotate-[32deg]" /></BreadcrumbSeparator>
            {pathList.map((item, index) => {
               return (
                  <React.Fragment key={index}>
                     <BreadcrumbItem>
                        <Link to={item.toLink} className={`text-xs text-muted-text ${item?.isActive ? `text-text font-normal` : ``}`}>
                           {item.title}
                        </Link>
                     </BreadcrumbItem>
                     {index !== pathList.length - 1 &&  <BreadcrumbSeparator ><LiaSlashSolid className="-rotate-[32deg]" /></BreadcrumbSeparator>}
                  </React.Fragment>
               );
            })}
         </BreadcrumbList>
      </Breadcrumb>
   );
};

export default BreadCrumb;
