import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { InMemoryWebApiModule } from "angular-in-memory-web-api";

import { AppRouterModule } from "./app-router.module";

import { AppComponent } from "../components/scripts/app.component";
import { BannerComponent } from "../components/scripts/banner.component";
import { PhoneBookComponent } from "../components/scripts/phone-book.component";
import { ContactInfoComponent } from "../components/scripts/contact-info.component";

import { PhonePipe } from "../pipes/phone-pipe";

import { BackendService } from "../services/backend.service";
import { ValidationService } from "../services/validation.service";
import { InMemoryDataService } from "../services/in-memory-data.service";

@NgModule({
  declarations: [
    AppComponent,
    BannerComponent,
    PhoneBookComponent,
    ContactInfoComponent
  ],

  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRouterModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService)
  ],

  providers: [
    BackendService,
    ValidationService,
    PhonePipe
  ],
  
  bootstrap: [AppComponent]
})

export class AppModule {}