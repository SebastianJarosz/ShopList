import { IPostData } from "../interface/IPostData";

export class UserProfileModel implements IPostData{
    email: string;
    name: string;
    surname: string;
    userName: string;

    constructor(nameTemp: string,
        surnameTemp: string,
        userNameTemp: string, emailTemp: string){
        this.name = nameTemp.toUpperCase();
        this.surname = surnameTemp.toUpperCase();
        this.userName = userNameTemp.toUpperCase();
        this.email = emailTemp.toLowerCase() ;
    }
}