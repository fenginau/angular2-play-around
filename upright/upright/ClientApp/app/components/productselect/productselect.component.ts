import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { IProductModel, ISearchModel, ICompanySelectModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'product-select',
    templateUrl: './productselect.component.html',
    styleUrls: ['./productselect.component.css'],
    providers: [Globals]
})
export class ProductSelectComponent {
    company: number = 0;
    inView: boolean = false;
    @Output()
    result: EventEmitter<IProductModel[]|null> = new EventEmitter<IProductModel[]|null>();
    products: IProductModel[] = [];
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
        this.getCompanySelect();
    }

    ppChange(pp: number) {
        this.perPage = pp;
    }

    getError(error: any) {
        this.hasError = 'An error occurred when requesting the data.';
        console.error(error);
        this.globals.loading(false);
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.productList = result.result as IProductModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
    }

    getCompanySelect() {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                const companySelect = result.json() as ICompanySelectModel[];
                this.fields[2].set = companySelect.map(c => ({ value: c.companyId, text: c.companyName }));
                this.fields = [...this.fields];
                this.hasError = '';
            }
        }, error => this.getError(error));
    }

    addToList(index: number) {
        this.products.push({ ...this.productList[index] });
        this.productList.splice(index, 1);
    }

    moveFromList(index: number) {
        this.products.splice(index, 1);
    }

    done() {
        this.result.emit(this.products);
    }

    ngOnInit() {
    }
}