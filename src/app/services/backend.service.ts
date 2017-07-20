import { Injectable } from "@angular/core";
import { Http, Response, Headers, ResponseOptions } from "@angular/http";

import { Observable } from "rxjs";
import "rxjs/add/operator/map";

import { Contact } from "../model/contact";

@Injectable() export class BackendService {
  private contactsURL: string = "api/contacts";
  private headers = new Headers({"Content-Type": "application/json"});
  private responseOptions = new ResponseOptions({headers: this.headers});

  constructor(private http: Http) {}

  createContact(firstName: string, lastName: string, phoneNumber: string, email:string): Observable<Contact> {
    let content = JSON.stringify({
                                  name: {
                                    firstName: firstName,
                                    lastName: lastName
                                  },
                                  phoneNumber: phoneNumber,
                                  email: email
                                });

    return this.http.post(this.contactsURL, content, this.responseOptions)
                    .map(response => response.json().data as Contact);
  }

  getContact(id: number): Observable<Contact> {
    const URL = `${this.contactsURL}/${id}`;

    return this.http.get(URL)
                    .map(response => response.json().data as Contact);
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get(this.contactsURL)
                    .map(response => response.json().data as Contact[]);
  }

  updateContact(contact: Contact): Observable<Contact> {
    const URL = `${this.contactsURL}/${contact.id}`;

    return this.http.put(URL, JSON.stringify(contact), this.responseOptions)
                    .map(() => contact);
  }

  deleteContact(id: number): Observable<void> {
    const URL = `${this.contactsURL}/${id}`;

    return this.http.delete(URL, this.responseOptions)
                    .map(() => null);
  }

  handleError(error: any): void {
    let errorMsg = "";

    switch(error.response.status) {
      case 0:
        errorMsg = "You did not connect.\n Verify your connection to the Internet.";
        break;
      case 404:
        errorMsg = "Requested page not found. [404]";
        break;
      case 500:
        errorMsg = "Internal Server Error [500].";
        break;
      default:
        errorMsg = "Unexpected error.\n" + JSON.stringify(error.response.status);
    }

    alert(errorMsg);
  }
}