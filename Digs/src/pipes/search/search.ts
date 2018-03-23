import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(items: any[], terms: number): any[] {
      if(!items) return [];
      if(!terms) return items;
  //  terms = terms.toLowerCase();
    return items.filter( it => {
      return it.Price; // only filter College
    });
  }
}
