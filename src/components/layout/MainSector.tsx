import { PinContainer } from '@/components/ui/3dPin'
// w-[20rem] h-[20rem]
const MainSector = () => {
   return (
      <div className="pl-4 pr-4">
         <div className="pt-10 grid grid-cols-3">
            <PinContainer title="/ui.aceternity.com" href="https://twitter.com/mannupaaji">
               <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                  <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">Aceternity UI</h3>
                  <div className="text-base !m-0 !p-0 font-normal">
                     <span className="text-slate-500 ">Customizable Tailwind CSS and Framer Motion Components.</span>
                  </div>
                  <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
               </div>
            </PinContainer>
         </div>
      </div>
   )
}

export default MainSector
