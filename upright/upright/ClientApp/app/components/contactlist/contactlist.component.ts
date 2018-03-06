import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from "../../utils/globals";
import { IContactModel } from "../../utils/models";

@Component({
    selector: 'contact-list',
    templateUrl: './contactlist.component.html',
    styleUrls: ['./contactlist.component.css'],
    providers: [Globals]
})
export class ContactListComponent {
    public contactList: IContactModel[];
    public hasError: string;

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    getAllContact() {
        this.http.get(this.baseUrl + 'api/business/GetAllContact').subscribe(result => {
            if (result.ok) {
                this.contactList = result.json() as IContactModel[];
                this.hasError = '';
            }
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
        });
    }

    viewDetail(contactId: number) {
        this.globals.goto('contact/' + contactId, {});
    }

    ngOnInit() {
        this.getAllContact();
    }
}