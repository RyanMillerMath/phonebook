import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PhoneBookComponent } from "../components/scripts/phone-book.component";
import { ContactInfoComponent } from "../components/scripts/contact-info.component";

const routes: Routes = [
      {
        path: "phonebook",
        component: PhoneBookComponent
      },
      {
        path: "contact/:id",
        component: ContactInfoComponent
      },
      {
        path: "",
        redirectTo: "/phonebook",
        pathMatch: "full"
      }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRouterModule {}