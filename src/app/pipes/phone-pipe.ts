import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "phone"
})

export class PhonePipe implements PipeTransform {
  transform(val: string): string {
    let position: number = 3, newVal: string;

    if(val.length < 3) {
      newVal = val
    } else if(val.length <= 6) {
      newVal = "(" + val.slice(0, position) + ") " + val.slice(position);
    } else {
      newVal = "(" + val.slice(0, position) + ") " + val.slice(position);

      position = 9;

      newVal = newVal.slice(0, position) + "-" + newVal.slice(position);

      
    }
    return newVal;
  }
}