import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'company',
    templateUrl: './company.component.html'
})
export class CompanyComponent {
    public sometext = 'abcde';

    constructor(
        private route: ActivatedRoute,
        private location: Location
    ) { }

    public changeText() {
        this.sometext = '12345';
    }

    ngOnInit() {
        let id = this.route.snapshot.paramMap.get('id');
        this.sometext = String(id);
    }
}
