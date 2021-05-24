export class RegistryResponseModel{
    succeeded: boolean;
    errors: Array<ErrorRegistry>;

    constructor(succeeded: boolean,
                errors: Array<ErrorRegistry>){
        this.succeeded = succeeded ;
        this.errors = errors;
        ;
    }

}
export class ErrorRegistry{
    code: string;
    description: string;
    
    constructor(code: string, description: string) {
    this.code = code;
    this.description = description;
    }
}