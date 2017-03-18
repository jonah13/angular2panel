import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
  transform(text:string, size:number) : string {
    return text.substring(0, size) + '...';
  }
}
