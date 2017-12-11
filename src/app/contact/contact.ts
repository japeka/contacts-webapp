export class Contact {
    
      id: number;
      firstName: string;
      lastName: string;
      phone: string;
      //0 = female, 1 = male
      gender: number; 
      avatar: string; 
      streetAddress: string;
      city: string;

      constructor(id?:number, firstName?:string, lastName?:string,
        phone?:string, gender?:number, avatar?:string, streetAddress?:string,city?:string){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.gender = gender;
        this.avatar = avatar;
        this.streetAddress = streetAddress;
        this.city = city;
      }
    }
    