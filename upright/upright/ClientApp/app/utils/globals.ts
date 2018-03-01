import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable()
export class Globals {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) { }
    goto(path: string, param: object) {
        this.router.navigate([path, param]);
    }
    goback() {
        this.location.back();
    }
}