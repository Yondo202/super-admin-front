import { TAction } from '@/utils/enums';

export type TActionProps<TData> = {
    select: TAction<TData>;
    setClose: ({ isDelete }: { isDelete?: boolean }) => void;
    storeid: string;
};