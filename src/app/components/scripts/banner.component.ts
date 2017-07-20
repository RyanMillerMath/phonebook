import { Component } from "@angular/core";

@Component({
  selector: "banner",
  templateUrl: "../templates/banner.component.html",
  styleUrls: ["../styles/banner.component.css"]
})

export class BannerComponent {
  title: string = "phonebook";
}