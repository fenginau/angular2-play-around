import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from "../../utils/globals";
import { ICompanyModel } from "../../utils/models";

@Component({
    selector: 'company-list',
    templateUrl: './companylist.component.html',
    styleUrls: ['./companylist.component.css'],
    providers: [Globals]
})
export class CompanyListComponent {
    companyList: ICompanyModel[];
    hasError: string = '';
    count: number;
    perPage: number = 20;
    oldPp: number = 0;
    pages: number[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    getAllCompany(index: number) {
        this.globals.loading(true);
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
                this.calcPage();
                this.getAllCompany(1);
            }
        }, error => this.getError(error));
    }

    calcPage() {
        if (this.oldPp !== this.perPage) {
            this.oldPp = this.perPage;
            this.pages = [...Array.from(Array(Math.ceil(this.count / this.perPage) + 1).keys())].slice(1);
            console.log(this.pages);
        }
    }

    getError(error :any) {
        this.hasError = 'An error occurred when requesting the data.';
        console.error(error);
        this.globals.loading(false);
    }

    viewDetail(companyId: number) {
        this.globals.goto(`company/${companyId}`, {});
    }

    ngOnInit() {
        this.getCount();
    }
}