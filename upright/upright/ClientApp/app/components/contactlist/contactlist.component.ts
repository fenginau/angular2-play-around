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
    count: number;
    perPage: number = 20;
    pages: number[];
    index: number = 1;
    totalPage: number = 0;

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
                this.setPage();
            }
        }, error => this.getError(error));
    }

    setPage() {
        this.totalPage = Math.ceil(this.count / this.perPage);
        this.pageClick(1);
    }

    pageClick(index: number) {
        if (index > 0 && index < this.totalPage + 1) {
            this.index = index;
            this.pages = this.globals.getPages(this.totalPage, index, 9);
            this.getAllContact(index);
        }
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