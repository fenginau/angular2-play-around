import { Component, Inject, Input } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Globals } from '../../utils/globals';
import { IProductModel, ICompanySelectModel } from '../../utils/models';
import { NgForm, NgModel } from '@angular/forms';

@Component({
    selector: 'product',
    styleUrls: ['./product.component.css'],
    templateUrl: './product.component.html',
    providers: [Globals]
})
export class ProductComponent {
    public productId: number;
    public companySelect: ICompanySelectModel[];
    public oldProduct: IProductModel = {
        productId: 0,
        productName: '',
        productDesc: '',
        companyId: 0,
        companyName: ''
    };
    public newProduct: IProductModel = {
        productId: 0,
        productName: '',
        productDesc: '',
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
            this.productId = Number(id);
            if (this.productId > 0) {
                this.getProduct();
            } else {
                this.setEdit();
            }
        });
    }

    setEdit() {
        this.newProduct = { ...this.oldProduct };
        this.isEdit = true;
    }

    cancelEdit() {
        this.isEdit = false;
    }

    onSubmit(form: NgForm) {
        if (form.valid) {
            this.newProduct.companyName = this.companySelect.filter(c => c.companyId == this.newProduct.companyId)[0].companyName;
            this.saveProduct();
        }
    }

    saveProduct() {
        this.globals.loading(true);
        this.http.post(`${this.baseUrl}api/business/SaveProduct`, this.newProduct).subscribe(result => {
            if (result.ok) {
                const product = result.json() as IProductModel;
                if (this.oldProduct.productId === 0) {
                    this.globals.goto(`/product/${product.productId}`, {});
                } else {
                    this.oldProduct = { ...product };
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

        this.oldProduct = { ...this.newProduct };
    }

    getProduct() {
        this.globals.loading(true);
        this.http.get(`${this.baseUrl}api/business/GetProduct?productid=${this.productId}`).subscribe(result => {
            if (result.ok) {
                this.oldProduct = result.json() as IProductModel;
                this.newProduct = { ...this.oldProduct};
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