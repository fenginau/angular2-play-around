import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { ITradeModel, IProductModel, ITradeProductModel } from '../../utils/models';
import { NgForm, NgModel } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';
import 'bootstrap-daterangepicker';

@Component({
    selector: 'trade',
    styleUrls: ['./trade.component.css'],
    templateUrl: './trade.component.html',
    providers: [Globals]
})
export class TradeComponent {
    tradeId: number;
    companyId: number;
    oldTrade: ITradeModel = {
        tradeId: 0,
        companyId: 0,
        tradeType: 0,
        tradeInvoice: '',
        tradeDate: moment().format(this.globals.dateFormat),
        tradeNote: '',
        companyName: '',
        products: []
    };
    newTrade: ITradeModel = {
        tradeId: 0,
        companyId: 0,
        tradeType: 0,
        tradeInvoice: '',
        tradeDate: moment().format(this.globals.dateFormat),
        tradeNote: '',
        companyName: '',
        products: []
    };

    hasError: string;
    processing: boolean = false;
    companyLock: boolean = false;
    productSelectShow: boolean = false;

    @Input()
    isEdit: boolean = false;
    @Input()
    isEmbed: boolean = false;

    constructor(
        private route: ActivatedRoute,
        private location: Location,
        private http: Http,
        private globals: Globals,
        @Inject('BASE_URL') private baseUrl: string
    ) {
        route.params.subscribe(val => {
            let id = this.route.snapshot.paramMap.get('id');
            this.tradeId = Number(id);
            if (this.tradeId > 0) {
                this.getTrade();
            } else {
                this.companyId = Number(val['company']);
                if (this.companyId > 0) {
                    this.setEdit();
                    this.getCompanyName(this.companyId);
                    this.newTrade.companyId = this.companyId;
                } else {
                    this.hasError = 'Entry error. Please try again.';
                }
            }
        });
    }

    setEdit() {
        if (this.oldTrade.tradeId > 0) {
            this.newTrade = { ...this.oldTrade };
        }
        this.isEdit = true;
        this.initDatePicker();
    }

    cancelEdit() {
        this.isEdit = false;
    }

    onSubmit(form: NgForm) {
        console.log(this.newTrade);
        if (form.valid) {
            this.saveTrade();
        }
    }

    saveTrade() {
        this.globals.loading(true);
        this.http.post(`${this.globals.apiUrl}api/business/SaveTrade`, this.newTrade).subscribe(result => {
            if (result.ok) {
                const trade = result.json() as ITradeModel;
                if (this.oldTrade.tradeId === 0) {
                    this.globals.goto(`/console/trade/${trade.tradeId}`, {});
                } else {
                    this.oldTrade = { ...trade };
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

        this.oldTrade = { ...this.newTrade };
    }

    getTrade() {
        this.globals.loading(true);
        this.http.get(`${this.globals.apiUrl}api/business/GetTrade?tradeid=${this.tradeId}`).subscribe(result => {
            if (result.ok) {
                this.oldTrade = result.json() as ITradeModel;
                console.log(this.oldTrade);
                this.oldTrade.tradeType = this.oldTrade.tradeType.toString();
                this.oldTrade.tradeDate = moment(this.oldTrade.tradeDate).format(this.globals.dateFormat);
                this.oldTrade.products.forEach(p => {
                    p.total = p.quantity * p.unitPrice;
                });
                this.newTrade = { ...this.oldTrade};
                this.hasError = '';
            }
            this.globals.loading(false);
        }, error => {
            this.hasError = 'An error occurred when requesting the data.';
            console.error(error);
            this.globals.loading(false);
        });
    }

    getCompanyName(companyId: number) {
        this.http.get(`${this.globals.apiUrl}api/business/GetCompanyName?companyid=${companyId}`).subscribe(result => {
            if (result.ok) {
                this.newTrade.companyName = result.text() as string;
                this.hasError = '';
            }
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

    getProduct(products: IProductModel[] | null) {
        if (products != null) {
            products.forEach(p => {
                const tradeProduct: ITradeProductModel = {
                    productId: p.productId,
                    productName: p.productName,
                    tradeId: this.tradeId,
                    quantity: 0,
                    unitPrice: 0,
                    total: 0
                };
                this.newTrade.products.push(tradeProduct);
            });
        }
        this.productSelectShow = false;
    }

    editProduct() {
        this.productSelectShow = true;
    }

    initDatePicker() {
        setTimeout(() => {
            $('#inputTradeDate').daterangepicker({
                singleDatePicker: true,
                showDropdowns: true,
                autoUpdateInput: true,
                locale: {
                    format: this.globals.dateFormat
                }
            }, (start: any, end: any, label: any) => {
                console.log(typeof start);
                this.newTrade.tradeDate = start.format(this.globals.dateFormat);
            });
        }, 1000);
    }

    ngOnInit() {
        this.initDatePicker();
    }
}