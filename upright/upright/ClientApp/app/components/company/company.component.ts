import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { ICompanyModel } from '../../utils/models';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'company',
    styleUrls: ['./company.component.css'],
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
    public processing: boolean = false;
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
        if (form.valid) {
            this.saveCompany();
        }
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

    isValid(control: NgModel) {
        if (control.invalid && (control.dirty || control.touched)) {
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