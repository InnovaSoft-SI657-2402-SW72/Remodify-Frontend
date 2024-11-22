export class Busines{
    public name: string;
    public description: string;
    public address: string;
    public city: string;
    public image: string;
    public expertise: string;
    public remodelerId?: number;
    

    //autocomplete constructor
    constructor(name:string, description:string, address: string, city: string, image: string, expertise: string, remodelerId?: number){
        this.name = name;
        this.description = description;
        this.address = address;
        this.city = city;
        this.image = image;
        this.expertise = expertise;
        this.remodelerId = remodelerId;
    }
}