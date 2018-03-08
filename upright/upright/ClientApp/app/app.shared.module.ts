import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './components/app/app.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { SearchareaComponent } from './components/searcharea/searcharea.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HomeComponent } from './components/home/home.component';
import { CounterComponent } from './components/counter/counter.component';
import { CompanyComponent } from './components/company/company.component';
import { CompanyListComponent } from './components/companylist/companylist.component';
import { ContactComponent } from './components/contact/contact.component';
import { ContactListComponent } from './components/contactlist/contactlist.component';
//import { HighlightDirective } from './utils/directives';


@NgModule({
    declarations: [
        AppComponent,
        CompanyComponent,
        CompanyListComponent,
        NavMenuComponent,
        SearchareaComponent,
        PaginationComponent,
        CounterComponent,
        HomeComponent,
        ContactComponent,
        ContactListComponent,
        //directives
        //HighlightDirective
    ],
    imports: [
        CommonModule,
        HttpModule,
        FormsModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'company', component: CompanyListComponent },
            { path: 'company/:id', component: CompanyComponent },
            { path: 'contact', component: ContactListComponent },
            { path: 'contact/:id', component: ContactComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ]
})
export class AppModuleShared {
}
