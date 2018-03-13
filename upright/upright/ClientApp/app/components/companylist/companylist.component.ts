import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { ICompanyModel, ISearchModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';


@Component({
    selector: 'company-list',
    templateUrl: './companylist.component.html',
    styleUrls: ['./companylist.component.css'],
    providers: [Globals]
})
export class CompanyListComponent {
    companyList: ICompanyModel[];
    hasError: string = '';
    count: number = 0;
    perPage: number = 20;
    //fields: string[] = ['Name', 'Address', 'Email', 'Phone', 'Mobile', 'ABN', 'ACN'];
    vt: IValueTextModel[] = [
        { value: 0, text: 'opt1' },
        { value: 1, text: 'opt2' },
        { value: 2, text: 'opt3' },
        { value: 3, text: 'opt4' }];
    fields: ISearchModel[] = [
        { field: 'Name', control: SearchControl.Input, value: '', set: null },
        { field: 'Address', control: SearchControl.Dropdown, value: '', set: this.vt },
        { field: 'Email', control: SearchControl.Checkbox, value: '', set: this.vt },
        { field: 'Phone', control: SearchControl.MultiSelect, value: '', set: this.vt },
        { field: 'Mobile', control: SearchControl.Radio, value: '', set: this.vt },
        { field: 'ABN', control: SearchControl.Input, value: '', set: null },
        { field: 'ACN', control: SearchControl.Input, value: '', set: null }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }
    
    getAllCompany(index: number) {
        this.http.get(`${this.baseUrl}api/business/GetAllCompany?pp=${this.perPage}&page=${index}`).subscribe(result => {
            if (result.ok) {
                this.companyList = result.json() as ICompanyModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        this.http.get(`${this.baseUrl}api/business/GetCompanyCount`).subscribe(result => {
            if (result.ok) {
                this.count = result.json() as number;
            }
        }, error => this.getError(error));
    }

    ppChange(pp: number) {
        this.perPage = pp;
    }

    getError(error :any) {
        this.hasError = 'An error occurred when requesting the data.';
        console.error(error);
        this.globals.loading(false);
    }

    getSearchResult(result: any) {
        console.log(result);
    }

    viewDetail(companyId: number) {
        this.globals.goto(`company/${companyId}`, {});
    }

    ngOnInit() {
        this.getCount();
    }
}