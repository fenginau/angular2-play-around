import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AuthGuard } from './auth-guard.service';
import { AuthService } from '../auth/auth.service';
import { FieldFilterPipe } from '../../utils/pipes';
import { AuthComponent } from './auth.component';
import { NavMenuComponent } from '../navmenu/navmenu.component';
import { SearchareaComponent } from '../searcharea/searcharea.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { HomeComponent } from '../home/home.component';
import { CounterComponent } from '../counter/counter.component';
import { CompanyComponent } from '../company/company.component';
import { CompanyListComponent } from '../companylist/companylist.component';
import { ContactComponent } from '../contact/contact.component';
import { ContactListComponent } from '../contactlist/contactlist.component';
import { ProductComponent } from '../product/product.component';
import { ProductListComponent } from '../productlist/productlist.component';
import { ProductSelectComponent } from '../productselect/productselect.component';
import { TradeComponent } from '../trade/trade.component';



@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forChild([
                {
                    path: 'console',
                    component: AuthComponent,
                    canActivate: [AuthGuard],
                    children: [
                        {
                            path: '',
                            canActivateChild: [AuthGuard],
                            children: [
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
                                { path: 'trade/:id', component: TradeComponent },
                                { path: '**', redirectTo: 'home' }
                            ]
                        }
                    ]
                }]
    )
    ],
    declarations: [
        FieldFilterPipe,
        AuthComponent,
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
        ProductListComponent,
        ProductSelectComponent,
        TradeComponent
    ],
    providers: [AuthGuard, AuthService]
})
export class AuthModule { }