import { createFileRoute, redirect } from '@tanstack/react-router'
import { Button } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { useAuthCore } from '@/core/AuthWrapper'
import { useState } from 'react'
import { TextInput } from '@/components/custom'
// import BackgroundBeams from '@/utils/lib/BgBeams'
import { AiOutlineUser } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";

export const Route = createFileRoute('/login')({
   beforeLoad: ({ context }) => {
      if (context.isAuthenticated) {
         throw redirect({
            to: '/',
         })
      }
   },
   component: Login,
})

type Tinitial = {
   username: string
   password: string
}

function Login() {
   const [loading, setLoading] = useState(false)
   const { handleSignIn } = useAuthCore()
   const { control, handleSubmit, setError, setValue } = useForm<Tinitial>({ mode: 'onChange', defaultValues: { username: '', password: '' } })

   const onSubmit = async (data: Tinitial) => {
      setLoading(true)
      const { success, message } = await handleSignIn(data)
      if (!success) {
         setError('password', { message: message })
         // setError('username', { message: message })
         setValue('password', '')
      }
      setLoading(false)
   }

   return (
      <div className="flex flex-col gap-6 p-40 pt-32">
         <img className="w-24" src="/siro.svg" />
         <form onSubmit={handleSubmit(onSubmit)}>
            {/* <ModeToggle /> */}
            <div className="w-96 rounded-md bg-card-bg p-6 pb-12 shadow-sm">
               <div className="mb-10 flex border-b text-base font-normal">
                  <div className="h-full border-b border-primary pb-2.5">Нэвтрэх</div>
               </div>
               <TextInput
                  beforeAddon={<AiOutlineUser />}
                  sizes="lg"
                  className="mb-6"
                  control={control}
                  label="Нэвтрэх нэр"
                  name="username"
                  rules={{ required: 'Нэвтрэх нэр' }}
               />
               <TextInput
                  beforeAddon={<IoKeyOutline />}
                  sizes="lg"
                  className="mb-6"
                  autoComplete="on"
                  type="password"
                  control={control}
                  name="password"
                  label="Нууц үг"
                  rules={{ required: 'Нууц үг' }}
               />
               <Button isLoading={loading} type="submit" className="mt-4 w-full">
                  Нэвтрэх &rarr;
               </Button>
            </div>
         </form>
         <div className='bg-box-parent'><div className='bg-box' /></div>
         {/* <BackgroundBeams /> */}
      </div>
   )
}
