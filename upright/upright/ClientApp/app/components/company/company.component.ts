import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { ICompanyModel } from '../../utils/models';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'company',
    templateUrl: './company.component.html',
    providers: [Globals]
})
export class CompanyComponent {
    public companyId: number;
    public oldCompany: ICompanyModel;
    public newCompany: ICompanyModel = {
        companyId: 0,
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone1: '',
        companyPhone2: '',
        companyContact: 0,
        companyAbn: '',
        companyAcn: ''
    };
    public testName: string;
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

    onSubmit(form: NgForm) {
        if (this.isValidate(this.newCompany)) {
            console.log(this.newCompany);

        }
        console.log(form);
    }

    saveCompany() {
        this.http.post(this.baseUrl + 'api/business/SaveCompany', this.newCompany).subscribe(result => {
            if (result.ok) {
                console.log('data saved');
            }
        }, error => {
            this.hasError = 'An error occurred when saving the data.';
            console.error(error);
        });

        this.oldCompany = {...this.newCompany};
        console.log(this.newCompany);
        console.log(this.oldCompany);
    }

    getCompany() {
        this.http.get(this.baseUrl + 'api/business/GetCompany?companyid=' + this.companyId).subscribe(result => {
            if (result.ok) {
                this.oldCompany = result.json() as ICompanyModel;
                this.newCompany = {...this.oldCompany};
                this.hasError = '';
            }
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
        });
    }

    isValidate(company: ICompanyModel) {
        if (company.companyName === '') {
            console.log(1);
            return false;
        }
        if (company.companyEmail !== '' &&
            !company.companyEmail.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            console.log(2);
            return false;
        }
        if (company.companyPhone1 !== '' && !company.companyPhone1.match(/^[\+]?[_0-9\s]{1,}$/)) {
            console.log(3);
            return false;
        }
        if (company.companyPhone2 !== '' && !company.companyPhone2.match(/^[\+]?[_0-9\s]{1,}$/)) {
            console.log(4);
            return false;
        }
        return true;
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.companyId = Number(id);
        if (this.companyId > 0) {
            this.getCompany();
        }
    }
}