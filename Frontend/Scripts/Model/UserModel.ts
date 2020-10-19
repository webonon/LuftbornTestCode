export class User {
    Name: string;
    UserName: string;
    Email: string;
    PhoneNumber: string;
    Address: string;

    constructor() { }

    public GetUserData(): void {

        this.Name = (<HTMLInputElement>document.getElementById("name")).value;
        this.UserName = (<HTMLInputElement>document.getElementById("user-name")).value;
        this.Email = (<HTMLInputElement>document.getElementById("mail")).value;
        this.PhoneNumber = (<HTMLInputElement>document.getElementById("phone-number")).value;
        this.Address = (<HTMLInputElement>document.getElementById("address")).value;
    }
}
