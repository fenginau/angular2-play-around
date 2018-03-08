import { Injectable, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../utils/sharedservice';

@Injectable()
export class Globals {
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private sharedService: SharedService
    ) { }

    loading(state: boolean) {
        if (state) {
            this.sharedService.emitChange('showloader');
        } else {
            this.sharedService.emitChange('hideloader');
        }
    }

    goto(path: string, param: object) {
        this.router.navigate([path, param]);
    }

    goback() {
        this.location.back();
    }
}