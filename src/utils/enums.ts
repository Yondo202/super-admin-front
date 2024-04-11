import { TAction } from "./connection/sharedTypes"; 
export const qKeys = Object.freeze({
   stores: 'webs',
   users: 'users',
   roles: 'roles',
   invite: 'invite',
   permission: 'permission',
   email_credential: 'email-credential',
   sms_credential: 'sms-credential',
});

// export const breadcrumbs = [{ title: 'Вэб хуудас' }, { title: 'Хээнцэр гутал' }];

// enum ActionType {
//    ADD = 'add',
//    EDIT = 'edit',
//    DELETE = 'delete',
// }
// export type TAction<T> = {
//    isOpen: boolean;
//    type: ActionType;
//    data: T | unknown;
// };

// export enum ActionTypes {
//    ADD = 'add',
//    EDIT = 'edit',
//    DELETE = 'delete',
// }



// export type TAction<T> = {
//    isOpen: boolean;
//    type: 'add' | 'edit' | 'delete'
//    data?: T;
// };

export const initalAction = <T>():TAction<T> => ({ isOpen: false, type: "add", data: {} as T });


export const validEmail = {
   pattern: {
      value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
      message: 'Е-мэйл хаяг аа зөв оруулна уу',
   },
};
