import { Controller, type FieldValues } from 'react-hook-form'
import { ErrorMessage, FloatingLabelInput } from '@/components/ui'
import { FloatingLabelInputProps } from '../ui/Input' // InputProps, TInputPropsAddition,
import { TControllerProps } from '@/utils/connection/sharedTypes' 

const ControlInput = <TFieldValues extends FieldValues>({ control, floatLabel, className = '', name, rules, label, ...props }: TControllerProps<TFieldValues> & FloatingLabelInputProps) => {
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
