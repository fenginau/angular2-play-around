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

    getPages(total: number, current: number, maxPage: number) {
        let half = Math.floor((maxPage - 1) / 2);
        let start: number;
        let end: number;
        if (current - 1 >= total - current) {
            end = Math.min(total, current + half);
            start = Math.max(1, end - half * 2);
        } else {
            start = Math.max(1, current - half);
            end = Math.min(total, start + half * 2);
        }
        return [...Array.from(Array(total + 1).keys())].slice(1).slice(start - 1, end);
    }
}