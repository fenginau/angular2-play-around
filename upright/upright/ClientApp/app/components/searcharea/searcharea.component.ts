import { Component, Input } from '@angular/core';

@Component({
    selector: 'search-area',
    templateUrl: './searcharea.component.html',
    styleUrls: ['./searcharea.component.css']
})
export class SearchareaComponent {
    @Input()
    module: string;
    @Input()
    fields: string[];
    @Input()
    message: string;
}
