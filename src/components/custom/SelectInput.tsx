import { Select, SelectValue, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Controller, type FieldValues } from 'react-hook-form';
import { SelectProps } from '@radix-ui/react-select';
import { ErrorMessage } from '@/components/ui';
import Label from '@/components/ui/Label';
import { cn } from '@/lib/utils';
import { TControllerProps } from '@/utils/connection/sharedTypes';

type TOption = {
   label: string;
   value: string;
};

type TSelectProps = {
   options: TOption[];
   label?: string;
} & SelectProps;

const SelectInput = <TFieldValues extends FieldValues>({ options, control, className = '', name, rules, label, ...props }: TControllerProps<TFieldValues> & TSelectProps) => {
   return (
      <div className={cn('w-full', className)}>
         <Controller
            control={control}
            name={name}
            rules={rules ?? { required: false }}
            render={({ fieldState, field }) => {
               return (
                  <>
                     <Label>{label}</Label>
                     <Select
                        // defaultValue={defaultPageSize.toString()}
                        // onValueChange={(e) => {
                        //    table.setPageSize(Number(e));
                        // }}
                        value={field.value}
                        onValueChange={(event) => field.onChange(event)}
                        {...props}
                     >
                        <SelectTrigger className={cn('w-full text-xs p-4 py-1 h-10', fieldState.error ? `border-danger-color` : ``)}>
                           <SelectValue placeholder="Сонго..." className="placeholder:text-muted-text/20" />
                        </SelectTrigger>
                        <SelectContent>
                           {options?.map((item, index) => (
                              <SelectItem key={index} value={item.value}>
                                 {item.label}
                              </SelectItem>
                           ))}
                        </SelectContent>
                     </Select>
                     <ErrorMessage error={fieldState?.error} />
                  </>
               );
            }}
         />
      </div>
   );
};

export default SelectInput;
