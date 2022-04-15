import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendPreZeros',
})
export class AppendPreZerosPipe implements PipeTransform {
  transform(value: number, limit = 2): unknown {
    return '00' + value;
  }
}
