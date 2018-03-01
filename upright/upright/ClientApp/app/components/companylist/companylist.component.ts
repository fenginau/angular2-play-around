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
    public companyList: ICompanyModel[];
    public hasError: string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    getAllCompany() {
        this.http.get(this.baseUrl + 'api/business/GetAllCompany').subscribe(result => {
            if (result.ok) {
                this.companyList = result.json() as ICompanyModel[];
                this.hasError = '';
            }
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
        });
    }

    viewDetail(companyId: number) {
        this.globals.goto('company/' + companyId, {});
    }

    ngOnInit() {
        this.getAllCompany();
    }
}