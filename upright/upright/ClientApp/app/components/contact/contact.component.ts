import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { IContactModel } from '../../utils/models';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'contact',
    styleUrls: ['./contact.component.css'],
    templateUrl: './contact.component.html',
    providers: [Globals]
})
export class ContactComponent {
    public contactId: number;
    public oldContact: IContactModel;
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
        if (form.valid) {
            this.saveContact();
        }
    }

    saveContact() {
        this.globals.loading(true);
        this.http.post(this.baseUrl + 'api/business/SaveContact', this.newContact).subscribe(result => {
            if (result.ok) {
                console.log('data saved');
            }
            this.globals.loading(false);
        }, error => {
            this.hasError = 'An error occurred when saving the data.';
            console.error(error);
            this.globals.loading(false);
        });

        this.oldContact = {...this.newContact};
    }

    getContact() {
        this.globals.loading(true);
        this.http.get(this.baseUrl + 'api/business/GetContact?contactid=' + this.contactId).subscribe(result => {
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

    isValid(control: NgModel) {
        if (control.invalid && (control.dirty || control.touched)) {
            return false;
        }
        return true;
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.contactId = Number(id);
        if (this.contactId > 0) {
            this.getContact();
        }
    }
}