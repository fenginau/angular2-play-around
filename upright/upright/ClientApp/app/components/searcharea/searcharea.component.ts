import { Component, Input } from '@angular/core';
import { ISearchModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';

@Component({
    selector: 'search-area',
    templateUrl: './searcharea.component.html',
    styleUrls: ['./searcharea.component.css']
})
export class SearchareaComponent {
    @Input()
    module: string;
    @Input()
    fields: ISearchModel[];
    @Input()
    message: string;

    searchControl = SearchControl;


    conditions: ISearchModel[] = [];

    getField(name: string) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].field === name) {
                return this.fields[i];
            }
        }
        return null;
    }

    onChangeField(name: string, index: number) {
        let field = this.getField(name);
        if (field) {
            this.conditions[index] = { ...field };
        }
    }

    check() {
        console.log(this.conditions);
    }

    ngOnInit() {
        
    }
    ngOnChanges() {
        this.conditions = [{ ...this.fields[0] }];
    }

}
