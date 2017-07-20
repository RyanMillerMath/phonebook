import { Injectable } from "@angular/core";

import { Contact } from "../model/contact";

@Injectable() export class ValidationService {
  isEmpty(inputField: string): boolean {
    return inputField ? false : true;
  }

  isValidPhoneNumber(phoneNumber: string) {
    if (phoneNumber.search(/\(\d{3}\) \d{3}-\d{4}/) > -1 && phoneNumber.length === 14) {
      return true;
    } else {
      return false;
    }
  }

  isValidEmail(email: string): boolean {
    if(email.search(/.+@.+\..+/) > -1) {
      return true;
    } else {
      return false;
    }
  }

  clearWhiteSpace(inputField: string): string {
    return inputField.trim();
  }
}