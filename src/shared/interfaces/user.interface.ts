import { PermissionEnum } from "../enums/permission.enum";
import { LangEnum } from "../../i18n";

export default interface UserInterface {
    id: string;
    name: string;
    email: string;
    roleId: string;
    roleName: string;
    language: LangEnum;
    permissions?: PermissionEnum[];
    imageUrl?: string;
}