import { OnInit } from "@angular/core";
import { IPostData } from "../interface/IPostData";

export class LoginPostModel implements IPostData {
    userName: string;
    password: string;
    constructor(userN: string, pass: string){
        this.userName = userN;
        this.password = pass;
    }

}