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
    contactList: IContactModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 20;
    fields: string[] = ['All', 'Name', 'Address', 'Email', 'Phone'];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals) { }

    getAllContact(index: number) {
        this.http.get(`${this.baseUrl}api/business/GetAllContact?pp=${this.perPage}&page=${index}`).subscribe(result => {
            if (result.ok) {
                this.contactList = result.json() as IContactModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        this.http.get(`${this.baseUrl}api/business/GetContactCount`).subscribe(result => {
            if (result.ok) {
                this.count = result.json() as number;
            }
        }, error => this.getError(error));
    }

    ppChange(pp: number) {
        this.perPage = pp;
    }

    getError(error: any) {
        this.hasError = 'An error occurred when requesting the data.';
        console.error(error);
        this.globals.loading(false);
    }

    viewDetail(contactId: number) {
        this.globals.goto(`contact/${contactId}`, {});
    }

    ngOnInit() {
        this.getCount();
    }
}