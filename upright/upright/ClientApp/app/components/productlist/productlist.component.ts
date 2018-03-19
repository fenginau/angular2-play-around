import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { IProductModel, ISearchModel, ICompanySelectModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'product-list',
    templateUrl: './productlist.component.html',
    styleUrls: ['./productlist.component.css'],
    providers: [Globals]
})
export class ProductListComponent {
    company: number = 0;
    inView: boolean = false;
    productList: IProductModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 10;
    isSearch: boolean = false;
    currentPage: number = 0;
    companySet: IValueTextModel[];
    fields: ISearchModel[] = [
        { field: 'Name', control: SearchControl.Input, value: '', set: null },
        { field: 'Desc', control: SearchControl.Input, value: '', set: null },
        { field: 'Company', control: SearchControl.Dropdown, value: '', set: null }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals, private route: ActivatedRoute) {
        let company = this.route.snapshot.paramMap.get('company');
        this.company = Number(company);
        if (this.company > 0) {
            this.inView = true;
            this.fields[2].value = this.company;
            this.fields[2].control = SearchControl.Unchangable;
            this.fields = [...this.fields];
        } else {
            this.getCompanySelect();
        }
    }

    getAllContact() {
        this.http.get(`${this.baseUrl}api/business/GetAllProduct?pp=${this.perPage}&page=${this.currentPage}`).subscribe(result => {
            if (result.ok) {
                this.productList = result.json() as IProductModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCompanyContact() {
        this.http.get(`${this.baseUrl}api/business/GetCompanyProduct?pp=${this.perPage}&page=${this.currentPage}&company=${this.company}`).subscribe(result => {
            if (result.ok) {
                this.productList = result.json() as IProductModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        const url = `${this.baseUrl}api/business/GetProductCount?company=${this.company}`;
        this.http.get(url).subscribe(result => {
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

    viewDetail(productId: number) {
        this.globals.goto(`product/${productId}`, {});
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.productList = result.result as IProductModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
        if (!this.isSearch) {
            if (this.company > 0) {
                this.getCompanyContact();
            } else {
                this.getAllContact();
            }
        }
    }

    getCompanySelect() {
        this.http.get(`${this.baseUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                const companySelect = result.json() as ICompanySelectModel[];
                this.fields[2].set = companySelect.map(c => ({ value: c.companyId, text: c.companyName }));
                this.fields = [...this.fields];
                this.hasError = '';
            }
        }, error => this.getError(error));
    }

    ngOnInit() {
        this.getCount();
    }
}