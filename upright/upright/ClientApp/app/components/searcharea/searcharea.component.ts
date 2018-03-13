import { Component, Input, Inject, Output, EventEmitter } from '@angular/core';
import { ISearchModel, ISearchParams } from '../../utils/models';
import { SearchControl } from '../../utils/enum';
import { Globals } from '../../utils/globals';
import { Http } from '@angular/http';

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
    @Output()
    result: EventEmitter<any> = new EventEmitter<any>();

    searchControl = SearchControl;
    conditions: ISearchModel[] = [];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    // get search field by field name
    getField(name: string) {
        for (let i = 0; i < this.fields.length; i++) {
            if (this.fields[i].field === name) {
                return this.fields[i];
            }
        }
        return null;
    }

    // when field changed, also changes the controls
    onChangeField(name: string, index: number) {
        let field = this.getField(name);
        if (field) {
            this.conditions[index] = { ...field };
        }
    }

    // push conditions
    addCondition() {
        this.conditions.push({ ...this.fields[0] });
    }

    // perform the search
    search() {
        const searchParams: ISearchParams[] = [];

        // set unchangable params first
        this.fields.forEach(f => {
            if (f.control === SearchControl.Unchangable) {
                searchParams.push({ key: f.field, value: f.value });
            }
        });

        // set user selected params
        this.conditions.forEach(c => {
            switch (c.control) {
                case SearchControl.Input:
                case SearchControl.Dropdown:
                    let find: boolean = false;
                    searchParams.forEach(s => {
                        if (s.key === c.field) {
                            s.value += `,${c.value.toString()}`;
                            find = true;
                        }
                    });
                    if (find) {
                        break;
                    }
                case SearchControl.Radio:
                    searchParams.push({ key: c.field, value: c.value.toString() });
                    break;
                case SearchControl.MultiSelect:
                    searchParams.push({ key: c.field, value: Array.from(c.value).join(',') });
                    break;
                case SearchControl.Checkbox:
                    let valueStr: string = '';
                    if (c.set != null) {
                        c.set.forEach(s => {
                            if (s.select) {
                                if (valueStr.length > 0) {
                                    valueStr += ',';
                                }
                                valueStr += s.value.toString();
                            }
                        });
                    }
                    searchParams.push({ key: c.field, value: valueStr });
                    break;
            }
        });
        
        this.globals.loading(true);
        this.http.post(`${this.baseUrl}api/business/Search?module=${this.module}`, searchParams).subscribe(result => {
            if (result.ok) {
                this.result.emit(result.json());
            }
            this.globals.loading(false);
        }, error => {
            this.result.emit(null);
        });
    }

    ngOnInit() {
        
    }
    ngOnChanges() {
        this.conditions = [{ ...this.fields[0] }];
    }

}
