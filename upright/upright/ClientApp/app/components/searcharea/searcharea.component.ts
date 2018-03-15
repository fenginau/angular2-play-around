import { Component, Input, Inject, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { ISearchModel, ISearchParams, ISearchReturnModel } from '../../utils/models';
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
    @Input()
    page: number;
    @Input()
    pp: number;
    @Input()
    inView: boolean;
    @Output()
    result: EventEmitter<ISearchReturnModel|null> = new EventEmitter<ISearchReturnModel|null>();

    isSearch: boolean = false;
    searchControl = SearchControl;
    conditions: ISearchModel[] = [];
    searchParams: ISearchParams[] = [];

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
        if (this.inView) {
            for (let i = 0; i < this.fields.length; i++) {
                if (this.fields[i].control !== SearchControl.Unchangable) {
                    this.conditions.push({ ...this.fields[i] });
                    break;
                }
            }
        } else {
            this.conditions.push({ ...this.fields[0] });
        }
    }

    buildSearchParams() {
        this.searchParams = [];
        // set unchangable params first
        this.fields.forEach(f => {
            if (f.control === SearchControl.Unchangable) {
                this.searchParams.push({ key: f.field, value: f.value });
            }
        });

        // set user selected params
        this.conditions.forEach(c => {
            switch (c.control) {
            case SearchControl.Input:
            case SearchControl.Dropdown:
                let find: boolean = false;
                if (c.value.toString() != '') {
                    this.searchParams.forEach(s => {
                        if (s.key === c.field) {
                            s.value += `,${c.value.toString()}`;
                            find = true;
                        }
                    });
                }
                if (find) {
                    break;
                }
            case SearchControl.Radio:
                if (c.value.toString() != '') {
                    this.searchParams.push({ key: c.field, value: c.value.toString() });
                }
                break;
            case SearchControl.MultiSelect:
                const set = Array.from(c.value);
                if (set.length > 0) {
                    this.searchParams.push({ key: c.field, value: set.join(',') });
                }
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
                if (valueStr.length > 0) {
                    this.searchParams.push({ key: c.field, value: valueStr });
                }
                break;
            }
        });
    }

    // perform the search
    getResult() {
        this.globals.loading(true);
        this.http.post(`${this.baseUrl}api/business/Search?module=${this.module}&pp=${this.pp}&page=${this.page}`, this.searchParams).subscribe(result => {
            if (result.ok) {
                this.result.emit(result.json() as ISearchReturnModel);
            }
            this.globals.loading(false);
        }, error => {
            this.result.emit(null);
        });
    }

    search() {
        this.isSearch = true;
        this.buildSearchParams();
        this.getResult();
    }

    ngOnInit() {
        
    }

    ngOnChanges(changes: SimpleChanges) {
        const pageChange = changes['page'];
        const ppChange = changes['pp'];
        const condChange = changes['fields'];
        if (((pageChange != undefined && pageChange.currentValue != pageChange.previousValue)
            || (ppChange != undefined && ppChange.currentValue != ppChange.previousValue))
            && this.isSearch) {
            this.getResult();
        }

        if (condChange != undefined && condChange.currentValue !== condChange.previousValue) {
            if (this.inView) {
                for (let i = 0; i < this.fields.length; i++) {
                    if (this.fields[i].control !== SearchControl.Unchangable) {
                        this.conditions = [{ ...this.fields[i] }];
                        break;
                    }
                }
            } else {
                this.conditions = [{ ...this.fields[0] }];
            }
        }
    }

}
