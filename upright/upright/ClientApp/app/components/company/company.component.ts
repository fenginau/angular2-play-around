import { Component, Inject } from '@angular/core';
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
    public oldCompany: ICompanyModel = {
        companyId: 0,
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone1: '',
        companyPhone2: '',
        companyAbn: '',
        companyAcn: ''
    };
    public newCompany: ICompanyModel = {
        companyId: 0,
        companyName: '',
        companyAddress: '',
        companyEmail: '',
        companyPhone1: '',
        companyPhone2: '',
        companyAbn: '',
        companyAcn: ''
    };
    public hasError: string;
    public isEdit: boolean = false;
    public processing: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http,
        private globals: Globals,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        route.params.subscribe(val => {
            let id = this.route.snapshot.paramMap.get('id');
            this.companyId = Number(id);
            if (this.companyId > 0) {
                this.getCompany();
            } else {
                this.setEdit();
            }
        });
    }

    setEdit() {
        this.isEdit = true;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.saveCompany();
        }
    }

    saveCompany() {
        this.globals.loading(true);
        this.http.post(this.baseUrl + 'api/business/SaveCompany', this.newCompany).subscribe(result => {
            if (result.ok) {
                const company = result.json() as ICompanyModel;
                if (this.oldCompany.companyId === 0) {
                    this.globals.goto(`/company/${company.companyId}/contact/${company.companyId}`, {});
                } else {
                    this.oldCompany = { ...company };
                }
                console.log('data saved');
            }
            this.isEdit = false;
            this.globals.loading(false);
        }, error => {
            this.hasError = 'An error occurred when saving the data.';
            console.error(error);
            this.isEdit = false;
            this.globals.loading(false);
        });
    }

    getCompany() {
        this.globals.loading(true);
        this.http.get(this.baseUrl + 'api/business/GetCompany?companyid=' + this.companyId).subscribe(result => {
            if (result.ok) {
                this.oldCompany = result.json() as ICompanyModel;
                this.newCompany = {...this.oldCompany};
                this.hasError = '';
            }
            this.globals.loading(false);
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
            this.globals.loading(false);
        });
    }

    isValid(control: NgModel) {
        if (control.invalid && (control.dirty || control.touched)) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        
    }
}