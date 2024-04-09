import { createFileRoute } from '@tanstack/react-router'
// import { useForm } from 'react-hook-form'

export const Route = createFileRoute('/_dashboard/about')({
   component: () => <AboutPage />,
})

function AboutPage() {
   // const { control } = useForm({ mode: 'onChange', defaultValues: { checked: true } })

   return (
      <div className='mt-10 p-4 wrapper'></div>
   )
}
