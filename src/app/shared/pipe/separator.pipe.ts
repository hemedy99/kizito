import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'separator'
})
export class SeparatorPipe implements PipeTransform {
  transform(value: any, ...args: any): any {
    if (
      value === null ||
      value === undefined ||
      value === '' ||
      typeof value === undefined
    ) {
      // console.log('value', value)
      return value;
    } else {
      let newValue = Array.from(value);
      let separator = args.pop();
      for (let index = 0; index < args.length; index++) {
        const element: number = +args[index];
        newValue.splice(element + index, 0, separator);
      }
      const returnValue = newValue.join(',');
      return returnValue.replace(/,/g, '');
    }
  }
}
