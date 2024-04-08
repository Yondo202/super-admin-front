export const qKeys = Object.freeze({
   stores: 'webs',
   users: 'users',
   roles: 'roles',
   permission: 'permission',
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

export type TAction<T> = {
   isOpen: boolean;
   type: 'add' | 'edit' | 'delete'
   data?: T;
};

// export type TAction<T> = {
//    isOpen: boolean;
//    type: 'add' | 'edit' | 'delete'
//    data?: T;
// };

export const initalAction = <T>():TAction<T> => ({ isOpen: false, type: "add", data: {} as T });
