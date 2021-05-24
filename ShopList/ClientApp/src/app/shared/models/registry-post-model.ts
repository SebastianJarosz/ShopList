import { OnInit } from "@angular/core";
import { IPostData } from "../interface/IPostData";

export class RegistryPostModel implements IPostData {
    name: string;
    surname: string;
    userName: string;
    password: string;
    email: string;
    
    constructor(name: string, surname: string, userN: string, email: string, pass: string){
        this.name = name;
        this.surname = surname;
        this.userName = userN;
        this.email = email;
        this.password = pass;
    }

}