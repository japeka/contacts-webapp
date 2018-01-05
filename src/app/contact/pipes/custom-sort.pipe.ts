import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';
@Pipe({
  name: 'customSort'
})
export class CustomSortPipe implements PipeTransform {
  transform(myArray: any, args?: any): any {
    if( args === 'gender') {
      return myArray.sort(function(a, b) {
        if (a.gender < b.gender) { return -1;
        } if (a.gender > b.gender) { return 1; }
        return 0;
      });
    } else if (args === 'firstName') {
      return myArray.sort(function(a, b) {
        if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) { return -1; }
        if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) { return 1; }
        return 0;
      });
    } else if (args === 'lastName') {
      // return var tmp = _.sortBy(myArray, o => o.lastName.toLowerCase());
      return myArray.sort(function(a, b) {
        if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) { return -1; }
        if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) { return 1; }
        return 0;
      });
    } else if (args === 'city')  {
      return myArray.sort(function(a, b) {
        if (a.city.toLowerCase() < b.city.toLowerCase()) { return -1; }
        if (a.city.toLowerCase() > b.city.toLowerCase()) { return 1; }
        return 0;
      });
    } else {
      return myArray;
    }
  }


}
