import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { ICompanyModel, ISearchModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';

@Component({
    selector: 'company-list',
    templateUrl: './companylist.component.html',
    styleUrls: ['./companylist.component.css'],
    providers: [Globals]
})
export class CompanyListComponent {
    @Input()
    inView: boolean = false;
    companyList: ICompanyModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 10;
    isSearch: boolean = false;
    currentPage: number = 0;
    fields: ISearchModel[] = [
        { field: 'Name', control: SearchControl.Input, value: '', set: null },
        { field: 'Address', control: SearchControl.Input, value: '', set: null },
        { field: 'Email', control: SearchControl.Input, value: '', set: null },
        { field: 'Phone', control: SearchControl.Input, value: '', set: null },
        { field: 'Mobile', control: SearchControl.Input, value: '', set: null },
        { field: 'ABN', control: SearchControl.Input, value: '', set: null },
        { field: 'ACN', control: SearchControl.Input, value: '', set: null }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }
    
    getAllCompany() {
        this.http.get(`${this.baseUrl}api/business/GetAllCompany?pp=${this.perPage}&page=${this.currentPage}`).subscribe(result => {
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

    viewDetail(companyId: number) {
        this.globals.goto(`console/company/${companyId}/contact/${companyId}`, {});
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.companyList = result.result as ICompanyModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
        if (!this.isSearch) {
            this.getAllCompany();
        }
    }

    add() {
        this.globals.goto('console/company/0', {});
    }

    ngOnInit() {
        this.getCount();
    }
}