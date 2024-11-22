export class Remodeler {
    id?: number;
    userId: number;
    description: string;
    phone: string;
    

    constructor(userId: number, description: string, phone: string) {
        this.userId = userId;
        this.description = description;
        this.phone = phone;
        
    }
}
