import { Component } from '@angular/core';
import { SharedService } from '../../utils/sharedservice';

@Component({
    selector: 'app',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [SharedService]
})
export class AppComponent {
    public loading: boolean = false;

    constructor(
        private sharedService: SharedService
    ) {
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
}
