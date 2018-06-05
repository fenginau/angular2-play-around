import { Component } from '@angular/core';
import { SharedService } from '../../utils/sharedservice';
import { Globals } from '../../utils/globals';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SharedService, Globals]
})
export class AppComponent {
    public loading: boolean = false;

    constructor(
        private sharedService: SharedService,
        private titleService: Title,
        private globals: Globals
    ) {
        this.setTitle(this.globals.siteName);
        sharedService.changeEmitted$.subscribe(text => {
            switch (text) {
            case 'showloader':
                this.loading = true;
                break;
            case 'hideloader':
                this.loading = false;
                break;
            default:
                break;
            }
        });
    }

    setTitle(newTitle: string) {
        this.titleService.setTitle(newTitle);
    }
}
