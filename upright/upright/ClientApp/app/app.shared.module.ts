import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { FieldFilterPipe } from './utils/pipes';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SearchareaComponent } from './components/searcharea/searcharea.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/companylist/companylist.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactListComponent } from './components/contactlist/contactlist.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/productlist/productlist.component';


@NgModule({
    declarations: [
        AppComponent,
        FieldFilterPipe,
        NavMenuComponent,
        SearchareaComponent,
        PaginationComponent,
        CounterComponent,
        HomeComponent,
        CompanyComponent,
        CompanyListComponent,
        ContactComponent,
        ContactListComponent,
        ProductComponent,
        ProductListComponent
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'companylist', component: CompanyListComponent },
            {
                path: 'company/:id', component: CompanyComponent, children: [
                    { path: 'contact/:company', component: ContactListComponent },
                    { path: 'product/:company', component: ProductListComponent }
                ]
            },
            { path: 'contactlist', component: ContactListComponent },
            { path: 'contact/:id', component: ContactComponent },
            { path: 'productlist', component: ProductListComponent },
            { path: 'product/:id', component: ProductComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
