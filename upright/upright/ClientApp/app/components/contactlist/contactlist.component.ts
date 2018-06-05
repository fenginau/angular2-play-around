import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { IContactModel, ISearchModel, ICompanySelectModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'contact-list',
    templateUrl: './contactlist.component.html',
    styleUrls: ['./contactlist.component.css'],
    providers: [Globals]
})
export class ContactListComponent {
    company: number = 0;
    inView: boolean = false;
    contactList: IContactModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 10;
    isSearch: boolean = false;
    currentPage: number = 0;
    companySet: IValueTextModel[];
    fields: ISearchModel[] = [
        { field: 'Name', control: SearchControl.Input, value: '', set: null },
        { field: 'Company', control: SearchControl.Dropdown, value: '', set: null },
        { field: 'Address', control: SearchControl.Input, value: '', set: null },
        { field: 'Email', control: SearchControl.Input, value: '', set: null },
        { field: 'Phone', control: SearchControl.Input, value: '', set: null },
        { field: 'Mobile', control: SearchControl.Input, value: '', set: null }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals, private route: ActivatedRoute) {
        let company = this.route.snapshot.paramMap.get('company');
        this.company = Number(company);
        if (this.company > 0) {
            this.inView = true;
            this.fields[1].value = this.company;
            this.fields[1].control = SearchControl.Unchangable;
            this.fields = [...this.fields];
        } else {
            this.getCompanySelect();
        }
    }

    getAllContact() {
        this.http.get(`${this.globals.apiUrl}api/business/GetAllContact?pp=${this.perPage}&page=${this.currentPage}`).subscribe(result => {
            if (result.ok) {
                this.contactList = result.json() as IContactModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCompanyContact() {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanyContact?pp=${this.perPage}&page=${this.currentPage}&company=${this.company}`).subscribe(result => {
            if (result.ok) {
                this.contactList = result.json() as IContactModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        const url = `${this.globals.apiUrl}api/business/GetContactCount?company=${this.company}`;
        this.http.get(url).subscribe(result => {
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
        this.globals.goto(`/console/contact/${contactId}`, {});
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.contactList = result.result as IContactModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
        if (!this.isSearch) {
            if (this.company > 0) {
                this.getCompanyContact();
            } else {
                this.getAllContact();
            }
        }
    }

    getCompanySelect() {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                const companySelect = result.json() as ICompanySelectModel[];
                this.fields[1].set = companySelect.map(c => ({ value: c.companyId, text: c.companyName }));
                this.fields = [...this.fields];
                this.hasError = '';
            }
        }, error => this.getError(error));
    }

    add() {
        this.globals.goto('/console/contact/0', {company: this.company});
    }

    ngOnInit() {
        this.getCount();
    }
}