import * as React from 'react'
import { HiOutlineChevronRight, HiOutlineChevronLeft } from "react-icons/hi";
import { RxDotsHorizontal } from "react-icons/rx";
import { cn } from '@/lib/utils'
import { ButtonProps, buttonVariants } from '@/components/ui/button'

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
   <nav role="navigation" aria-label="pagination" className={cn('mx-auto flex w-auto justify-center', className)} {...props} />
)
Pagination.displayName = 'Pagination'

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(({ className, ...props }, ref) => (
   <ul ref={ref} className={cn('flex flex-row items-center gap-1', className)} {...props} />
))
PaginationContent.displayName = 'PaginationContent'

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />)
PaginationItem.displayName = 'PaginationItem'

type PaginationLinkProps = {
   isActive?: boolean
} & Pick<ButtonProps, 'size'> &
   React.ComponentProps<'a'>

const PaginationLink = ({ className, isActive, size = 'sm', ...props }: PaginationLinkProps) => (
   <a
      aria-current={isActive ? 'page' : undefined}
      className={cn(
         buttonVariants({
            variant: isActive ? 'outline' : 'ghost',
            size,
         }),
         `${className} text-xs ${isActive?``:`text-muted-text`}`,
      )}
      {...props}
   />
)
PaginationLink.displayName = 'PaginationLink'

const PaginationPrevious = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink aria-label="Өмнөх" size="default" className={cn('gap-1 pl-2.5 font-normal', className)} {...props}>
      <HiOutlineChevronLeft/>
      <span>Өмнөх</span>
   </PaginationLink>
)
PaginationPrevious.displayName = 'PaginationPrevious'

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
   <PaginationLink aria-label="Дараах" size="default" className={cn('gap-1 pr-2.5 font-normal', className)} {...props}>
      <span>Дараах</span>
      <HiOutlineChevronRight />
   </PaginationLink>
)
PaginationNext.displayName = 'PaginationNext'

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
   <span aria-hidden className={cn('flex h-9 w-9 items-center justify-center', className)} {...props}>
      <RxDotsHorizontal className="h-4 w-4" />
      <span className="sr-only">More pages</span>
   </span>
)
PaginationEllipsis.displayName = 'PaginationEllipsis'

export { Pagination, PaginationContent, PaginationLink, PaginationItem, PaginationPrevious, PaginationNext, PaginationEllipsis }
