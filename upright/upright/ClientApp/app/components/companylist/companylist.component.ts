import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';

@Component({
    selector: 'company-list',
    templateUrl: './companylist.component.html'
})
export class CompanyListComponent {
    public companyList: ICompanyModel[];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string) { }

    getAllCompany(): void {
        this.http.get(this.baseUrl + 'api/upright/GetAllCompanyList').subscribe(result => {
            this.companyList = result.json() as ICompanyModel[];
        }, error => console.error(error));
    }

    ngOnInit() {
        this.getAllCompany();
    }
}
interface ICompanyModel {
    companyId: number;
    companyName: string;
    companyAddress: string;
    companyEmail: string;
    companyPhone1: string;
    companyPhone2: string;
    companyContact: number;
    companyAbn: string;
    companyAcn: string;
}