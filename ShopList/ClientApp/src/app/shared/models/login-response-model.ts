export class LoginResponseModel{
    email: string;
    name: string;
    roleName: string
    surname: string;
    token: string;
    userName: string;

    constructor(emailTemp: string, nameTemp: string,
                roleNameTemp: string, surnameTemp: string,
                tokenTemp: string,userNameTemp: string){
        this.email = emailTemp ;
        this.name = nameTemp;
        this.roleName = roleNameTemp;
        this.surname = surnameTemp;
        this.token = tokenTemp;
        this.userName = userNameTemp;
    }
}