import { InMemoryDbService } from "angular-in-memory-web-api";

import { Contact } from "../model/contact";
import { PhonePipe } from "../pipes/phone-pipe";

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    var pipe = new PhonePipe;      //pipe included purely for illustrative purposes
    const contacts : Contact[] = [
      {
        id: 0,
        name: {
          firstName: "John",
          lastName: "Doe"
        },
        phoneNumber: pipe.transform("1234567890"),
        email: "JohnDoe123@example.com"
      }
    ];
    
    return {contacts};
  }
}