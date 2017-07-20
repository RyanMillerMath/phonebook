import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Contact } from "../../model/contact";
import { BackendService } from "../../services/backend.service";
import { ValidationService } from "../../services/validation.service";
import { PhonePipe } from "../../pipes/phone-pipe";

@Component({
  selector: "phone-book",
  templateUrl: "../templates/phone-book.component.html",
  styleUrls: ["../styles/phone-book.component.css"]
})

export class PhoneBookComponent implements OnInit {
  contacts: Contact[];
  selectedContact: Contact;
  add: boolean = false;

  constructor(
    private backendCommunicator: BackendService,
    private validator: ValidationService,
    private formatter: PhonePipe,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.backendCommunicator.getAllContacts()
                            .subscribe(
                              returnedContacts => this.contacts = returnedContacts,
                              error => this.backendCommunicator.handleError(error)
                            );
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  goToInfo(): void {
    const URL = ["./contact", this.selectedContact.id];
    this.router.navigate(URL);
  }

  addContact(name: string, phoneNumber: string, email: string): void {
    var firstName: string,
        lastName: string,
        nameEmpty = this.validator.isEmpty(name),
        numberEmpty = this.validator.isEmpty(phoneNumber),
        emailEmpty = this.validator.isEmpty(email),
        validNumber = this.validator.isValidPhoneNumber(phoneNumber),
        validEmail = this.validator.isValidEmail(email);

    name = this.validator.clearWhiteSpace(name);
    phoneNumber = this.validator.clearWhiteSpace(phoneNumber);
    email = this.validator.clearWhiteSpace(email);

    if(nameEmpty || numberEmpty || emailEmpty) {
      alert("Please provide a name, phone number, and email.");
      return;
    } else if (!validNumber) {
      alert("The inputted phone number was either not a valid phone number or not formatted correctly.\nPlease format the number as (XXX) XXX-XXXX.");
      return;
    } else if (!validEmail) {
      alert("The inputted email is not a valid email.");
      return;
    }

    if(name.indexOf(" ") > 0) {
      firstName = name;
    } else {
      firstName = name.slice(0, name.indexOf(" "));
      lastName = name.slice(name.indexOf(" "));
    }

    this.backendCommunicator.createContact(firstName, lastName, phoneNumber, email)
                            .subscribe(
                              contact => {
                                this.contacts.push(contact);
                                this.selectedContact = null;
                                this.add = !this.add;
                              },
                              error => this.backendCommunicator.handleError(error)
                            );
  }

  removeContact(contact: Contact): void {
    this.backendCommunicator.deleteContact(contact.id)
                            .subscribe(
                              () => {
                                this.contacts = this.contacts
                                                    .filter(updatedContacts => updatedContacts !== contact);

                                if(this.selectedContact === contact) {
                                  this.selectedContact = null;
                                }
                              },
                              error => this.backendCommunicator.handleError(error)
                            );
  }
}