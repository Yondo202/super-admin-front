import { Controller, type Control, type RegisterOptions, type FieldValues, type FieldPath } from 'react-hook-form'
import { ErrorMessage, FloatingLabelInput } from '@/components/ui'
import { FloatingLabelInputProps } from '../ui/Input' // InputProps, TInputPropsAddition,

// type TController = UseControllerProps

// export type UseControllerProps<TFieldValues extends FieldValues = FieldValues> = {
//    name: FieldName<TFieldValues>
//    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
//    onFocus?: () => void
//    defaultValue?: unknown
//    control?: Control<TFieldValues>
// }

type TInputWithControl<TFieldValues extends FieldValues = FieldValues> = {
   control: Control<TFieldValues>
   name: FieldPath<TFieldValues>
   rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
   className?: string
} & FloatingLabelInputProps

const ControlInput = <TFieldValues extends FieldValues>({ control, floatLabel, className = '', name, rules, label, ...props }: TInputWithControl<TFieldValues>) => {
   return (
      <div className={className}>
         <Controller
            control={control}
            name={name}
            rules={rules ?? { required: false }}
            render={({ field, fieldState }) => {
               const inputProps = {
                  ...field,
                  label: label,
                  id: field.name,
                  type: 'text',
                  ...props,
                  floatLabel,
                  requiredInput: rules?.required,
               }
               return (
                  <>
                     <FloatingLabelInput {...inputProps} placeholder="" variant={fieldState?.error ? `error` : 'default'} />
                     <ErrorMessage error={fieldState?.error} />
                  </>
               )
            }}
         />
      </div>
   )
}

export default ControlInput
