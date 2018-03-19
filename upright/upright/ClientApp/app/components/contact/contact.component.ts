import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { IContactModel, ICompanySelectModel } from '../../utils/models';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.css'],
    templateUrl: './contact.component.html',
    providers: [Globals]
})
export class ContactComponent {
    public contactId: number;
    public companySelect: ICompanySelectModel[];
    public oldContact: IContactModel = {
        contactId: 0,
        contactName: '',
        contactEmail: '',
        contactPhone1: '',
        contactPhone2: '',
        companyId: 0,
        companyName: ''
    };
    public newContact: IContactModel = {
        contactId: 0,
        contactName: '',
        contactEmail: '',
        contactPhone1: '',
        contactPhone2: '',
        companyId: 0,
        companyName: ''
    };

    public hasError: string;
    public processing: boolean = false;

    @Input()
    public isEdit: boolean = false;
    @Input()
    public isEmbed: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http,
        private globals: Globals,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        route.params.subscribe(val => {
            let id = this.route.snapshot.paramMap.get('id');
            this.contactId = Number(id);
            if (this.contactId > 0) {
                this.getContact();
            } else {
                this.setEdit();
            }
        });
    }

    setEdit() {
        this.newContact = { ...this.oldContact };
        this.isEdit = true;
    }

    cancelEdit() {
        this.isEdit = false;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.newContact.companyName = this.companySelect.filter(c => c.companyId == this.newContact.companyId)[0].companyName;
            this.saveContact();
        }
    }

    saveContact() {
        this.globals.loading(true);
        this.http.post(`${this.baseUrl}api/business/SaveContact`, this.newContact).subscribe(result => {
            if (result.ok) {
                const contact = result.json() as IContactModel;
                if (this.oldContact.contactId === 0) {
                    this.globals.goto(`/contact/${contact.contactId}`, {});
                } else {
                    this.oldContact = { ...contact };
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

        this.oldContact = { ...this.newContact };
    }

    getContact() {
        this.globals.loading(true);
        this.http.get(`${this.baseUrl}api/business/GetContact?contactid=${this.contactId}`).subscribe(result => {
            if (result.ok) {
                this.oldContact = result.json() as IContactModel;
                this.newContact = {...this.oldContact};
                this.hasError = '';
            }
            this.globals.loading(false);
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
            this.globals.loading(false);
        });
    }

    getCompanySelect() {
        this.http.get(`${this.baseUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                this.companySelect = result.json() as ICompanySelectModel[];
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
        this.getCompanySelect();
    }
}