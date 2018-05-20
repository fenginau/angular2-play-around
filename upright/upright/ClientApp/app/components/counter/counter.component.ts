import { Component } from '@angular/core';
import * as $ from 'jquery';
import 'bootstrap-daterangepicker';

@Component({
    selector: 'counter',
    templateUrl: './counter.component.html'
})
export class CounterComponent {
    public currentCount = 0;

    public incrementCounter() {
        this.currentCount++;
    }

    ngOnInit() {
        $('input[name="birthdate"]').daterangepicker({
            singleDatePicker: true,
            showDropdowns: true
        });
    }
}
