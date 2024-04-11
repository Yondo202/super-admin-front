import { type Control, type RegisterOptions, type FieldValues, type FieldPath } from 'react-hook-form'


export type TAction<T> = {
    isOpen: boolean;
    type: 'add' | 'edit' | 'delete'
    data?: T;
 };

export type TActionProps<TData> = {
    select: TAction<TData>;
    setClose: ({ isDelete }: { isDelete?: boolean }) => void;
    storeid: string;
};

export type TControllerProps<TFieldValues extends FieldValues = FieldValues> = {
    control: Control<TFieldValues>
    name: FieldPath<TFieldValues>
    rules?: Exclude<RegisterOptions, 'valueAsNumber' | 'valueAsDate' | 'setValueAs'>
    className?: string
 } 