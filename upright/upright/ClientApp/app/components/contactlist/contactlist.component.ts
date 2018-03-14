import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { IContactModel, ISearchModel, ICompanySelectModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';

@Component({
    selector: 'contact-list',
    templateUrl: './contactlist.component.html',
    styleUrls: ['./contactlist.component.css'],
    providers: [Globals]
})
export class ContactListComponent {
    @Input()
    inView: boolean = false;
    @Input()
    company: number;
    contactList: IContactModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 20;
    isSearch: boolean = false;
    currentPage: number = 0;
    companySet: IValueTextModel[];
    fields: ISearchModel[] = [
        { field: 'Name', control: SearchControl.Input, value: '', set: null },
        { field: 'Company', control: this.inView ? SearchControl.Unchangable : SearchControl.Dropdown, value: this.inView ? this.company : '', set: this.companySet },
        { field: 'Address', control: SearchControl.Input, value: '', set: null },
        { field: 'Email', control: SearchControl.Input, value: '', set: null },
        { field: 'Phone', control: SearchControl.Input, value: '', set: null },
        { field: 'Mobile', control: SearchControl.Input, value: '', set: null }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    getAllContact() {
        this.http.get(`${this.baseUrl}api/business/GetAllContact?pp=${this.perPage}&page=${this.currentPage}`).subscribe(result => {
            if (result.ok) {
                this.contactList = result.json() as IContactModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        this.http.get(`${this.baseUrl}api/business/GetContactCount`).subscribe(result => {
            if (result.ok) {
                this.count = result.json() as number;
            }
        }, error => this.getError(error));
    }

    ppChange(pp: number) {
        this.perPage = pp;
    }

    getError(error: any) {
        this.hasError = 'An error occurred when requesting the data.';
        console.error(error);
        this.globals.loading(false);
    }

    viewDetail(contactId: number) {
        this.globals.goto(`contact/${contactId}`, {});
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.contactList = result.result as IContactModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
        if (!this.isSearch) {
            this.getAllContact();
        }
    }

    getCompanySelect() {
        this.http.get(`${this.baseUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                let companySelect = result.json() as ICompanySelectModel[];
                this.fields[1].set = companySelect.map(c => ({ value: c.companyId, text: c.companyName }));
                this.hasError = '';
            }
        }, error => this.getError(error));
    }

    ngOnInit() {
        if (!this.inView) {
            this.getCount();
            this.getCompanySelect();
        } else {

        }
    }
}