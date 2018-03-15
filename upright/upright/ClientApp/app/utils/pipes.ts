import { Pipe, PipeTransform } from '@angular/core';
import { SearchControl } from './enum';

@Pipe({
    name: 'fieldFilter'
})
export class FieldFilterPipe implements PipeTransform {
    transform(objects: any[]): any {
        if (objects) {
            return objects.filter(object => object.control != SearchControl.Unchangable);
        }
        return objects;
    }
}