import { Injectable, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { SharedService } from '../utils/sharedservice';

@Injectable()
export class Globals {

    dateFormat: string = 'YYYY/MM/DD';
    datePipeFormat: string = 'yyyy/MM/dd';
    siteName = 'upright';
    apiSiteName = 'uprightapi';
    apiUrl = this.getApiUrl();

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private location: Location,
        private sharedService: SharedService,
        @Inject('BASE_URL') private baseUrl: string
    ) { }

    private getApiUrl() {
        const matches = this.baseUrl.match(/^https?\:\/\/([^\/:?#]+)(?:[\/:?#]|$)/i);
        const domain = matches && `${matches[0]}${this.apiSiteName}\\`;
        return domain;
    }

    loading(state: boolean) {
        if (state) {
            this.sharedService.emitChange('showloader');
        } else {
            this.sharedService.emitChange('hideloader');
        }
    }

    truncate(value: string, length: number, breakword: boolean) {
        if (value == undefined || value == null) return '';
        if (breakword == undefined) breakword = true;
        if (value.length > length) {
            if (breakword) {
                return value.substring(0, length - 3) + '...';
            } else {
                let wordList = value.split(' ');
                let newList: string[] = [];
                let sLength = 0;
                for (var i = 0, len = wordList.length; i < len; i++) {
                    sLength = sLength + wordList[i].length;
                    if (sLength < length) {
                        newList.push(wordList[i]);
                    } else {
                        break;
                    }
                }
                return newList.join(' ') + '...';
            }
        } else {
            return value;
        }
    }

    convertChangeLine(value: string) {
        return value.replace(/\r\n/g, '<br>').replace(/[\r\n]/g, '<br>');
    }

    goto(path: string, param: object) {
        this.router.navigate([path, param]);
    }

    goback() {
        this.location.back();
    }
}