import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from "../../utils/globals";
import { ICompanyModel } from "../../utils/models";

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    providers: [Globals]
})
export class CompanyComponent {
    public companyId: number;
    public oldCompany: ICompanyModel;
    public hasError: string;
    public isEdit: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http,
        private globals: Globals,
        @Inject('BASE_URL') private baseUrl: string
    ) { }

    changeEdit() {
        this.isEdit = !this.isEdit;
    }

    getCompany() {
        this.http.get(this.baseUrl + 'api/business/GetCompany?companyid=' + this.companyId).subscribe(result => {
            if (result.ok) {
                this.oldCompany = result.json() as ICompanyModel;
                this.hasError = '';
                console.log(result);
            }
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
        });
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.companyId = Number(id);
        this.getCompany();
    }
}