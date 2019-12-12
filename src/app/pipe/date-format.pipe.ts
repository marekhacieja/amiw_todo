import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: string): string {
    return moment(value).calendar(null, {
      sameDay: '[Today] | HH:mm',
      lastDay: '[Yesterday] | HH:mm',
      lastWeek : 'DD/MM/YYYY | HH:mm',
      sameElse: 'DD/MM/YYYY | HH:mm'
    });
  }
}
