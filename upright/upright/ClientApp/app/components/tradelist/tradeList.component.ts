import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Globals } from '../../utils/globals';
import { ITradeModel, ISearchModel, ICompanySelectModel, IValueTextModel } from '../../utils/models';
import { SearchControl } from '../../utils/enum';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'trade-list',
    templateUrl: './tradelist.component.html',
    styleUrls: ['./tradelist.component.css'],
    providers: [Globals]
})
export class TradeListComponent {
    company: number = 0;
    inView: boolean = false;
    tradeList: ITradeModel[];
    hasError: string;
    count: number = 0;
    perPage: number = 10;
    isSearch: boolean = false;
    currentPage: number = 0;
    companySet: IValueTextModel[];
    fields: ISearchModel[] = [
        { field: 'Date', control: SearchControl.Input, value: '', set: null },
        { field: 'Company', control: SearchControl.Dropdown, value: '', set: null },
        { field: 'Invoice', control: SearchControl.Input, value: '', set: null },
        { field: 'Type', control: SearchControl.Radio, value: '', set: [{ value: 0, text: 'Sell' }, { value: 1, text: 'Buy' }] }];

    constructor(private http: Http, @Inject('BASE_URL') private baseUrl: string, private globals: Globals, private route: ActivatedRoute) {
        let company = this.route.snapshot.paramMap.get('company');
        this.company = Number(company);
        if (this.company > 0) {
            this.inView = true;
            this.fields[1].value = this.company;
            this.fields[1].control = SearchControl.Unchangable;
            this.fields = [...this.fields];
        } else {
            this.getCompanySelect();
        }
    }

    getAllTrade() {
        this.http.get(`${this.globals.apiUrl}api/business/GetAllTrade?pp=${this.perPage}&page=${this.currentPage}`).subscribe(result => {
            if (result.ok) {
                this.tradeList = result.json() as ITradeModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCompanyTrade() {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanyTrade?pp=${this.perPage}&page=${this.currentPage}&company=${this.company}`).subscribe(result => {
            if (result.ok) {
                this.tradeList = result.json() as ITradeModel[];
            }
            this.globals.loading(false);
        }, error => this.getError(error));
    }

    getCount() {
        this.globals.loading(true);
        const url = `${this.globals.apiUrl}api/business/GetTradeCount?company=${this.company}`;
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

    viewDetail(tradeId: number) {
        this.globals.goto(`/console/trade/${tradeId}`, {});
    }

    getSearchResult(result: any) {
        this.isSearch = true;
        this.count = result.count;
        this.tradeList = result.result as ITradeModel[];
    }

    onPageChange(page: number) {
        this.currentPage = page;
        if (!this.isSearch) {
            if (this.company > 0) {
                this.getCompanyTrade();
            } else {
                this.getAllTrade();
            }
        }
    }

    getCompanySelect() {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanySelect`).subscribe(result => {
            if (result.ok) {
                const companySelect = result.json() as ICompanySelectModel[];
                this.fields[1].set = companySelect.map(c => ({ value: c.companyId, text: c.companyName }));
                this.fields = [...this.fields];
                this.hasError = '';
            }
        }, error => this.getError(error));
    }

    getTradeType(typeInt: number) {
        return typeInt === 0 ? 'Sell' : 'Buy';
    }

    add() {
        this.globals.goto('/console/trade/0', { company: this.company });
    }

    ngOnInit() {
        this.getCount();
    }
}