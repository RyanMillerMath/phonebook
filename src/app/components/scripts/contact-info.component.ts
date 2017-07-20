import { Component, OnInit, Input } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Location } from "@angular/common";

import "rxjs/add/operator/switchMap";

import { Contact } from "../../model/contact";
import { BackendService } from "../../services/backend.service";
import { ValidationService } from "../../services/validation.service";
import { PhonePipe } from "../../pipes/phone-pipe";

@Component({
  selector: "contact-info",
  templateUrl: "../templates/contact-info.component.html",
  styleUrls: ["../styles/contact-info.component.css"]
})

export class ContactInfoComponent implements OnInit {
  contact: Contact;
  editing: boolean = false;

  constructor(
    private backendCommunicator: BackendService,
    private validator: ValidationService,
    private formatter: PhonePipe,
    private contactInfoRoute: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.contactInfoRoute.params
                         .switchMap((params: Params) => this.backendCommunicator.getContact(Number(params["id"])))
                         .subscribe(
                           contact => this.contact = contact,
                           error => this.backendCommunicator.handleError(error)
                         );
  }

  saveChanges(): void {
    var firstName = this.contact.name.firstName,
        lastName = this.contact.name.lastName,
        phoneNumber = this.contact.phoneNumber,
        email = this.contact.email,

        firstNameEmpty = this.validator.isEmpty(firstName),
        lastNameEmpty = this.validator.isEmpty(lastName),
        numberEmpty = this.validator.isEmpty(phoneNumber),
        emailEmpty = this.validator.isEmpty(email),

        validNumber = this.validator.isValidPhoneNumber(phoneNumber),
        validEmail = this.validator.isValidEmail(email);

    firstName = this.validator.clearWhiteSpace(firstName);
    lastName = this.validator.clearWhiteSpace(lastName);
    phoneNumber = this.validator.clearWhiteSpace(phoneNumber);
    email = this.validator.clearWhiteSpace(email);

    if(firstNameEmpty && lastNameEmpty) {
      alert("A contact must have at least a first or last name.");
      return;
    } else if(numberEmpty || emailEmpty) {
      alert("A contact must have a number and email.");
      return;
    } else if (!validNumber) {
      alert("The inputted phone number was either not a valid phone number or not formatted correctly.\nPlease format the number as (XXX) XXX-XXXX.");
      return;
    } else if (!validEmail) {
      alert("The inputted email is not a valid email.");
      return;
    }

    this.backendCommunicator.updateContact(this.contact)
                            .subscribe(
                              () => this.editing = !this.editing,
                              error => this.backendCommunicator.handleError(error)
                            );
  }

  backToPhonebook(): void {
    this.location.back();
  }
}