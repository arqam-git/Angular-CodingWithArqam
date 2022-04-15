import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'appendPrePostDashes',
})
export class AppendPostDashesPipe implements PipeTransform {
  transform(value: any): unknown {
    return '----------------------------------------' + value;
  }
}
