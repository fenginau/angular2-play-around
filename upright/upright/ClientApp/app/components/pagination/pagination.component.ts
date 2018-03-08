import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.css']
})
export class PaginationComponent {
    @Input()
    count: number;
    @Input()
    maxPage: number;
    @Output()
    current: EventEmitter<number> = new EventEmitter<number>();
    @Output()
    pp: EventEmitter<number> = new EventEmitter<number>();

    perPage: number = 20;
    index: number = 1;
    pages: number[];
    totalPage: number = 1;

    setPage() {
        this.totalPage = Math.max(1, Math.ceil(this.count / this.perPage));
        this.pp.emit(this.perPage);
        this.pageClick(1);
    }

    pageClick(index: number) {
        if (index > 0 && index < this.totalPage + 1) {
            this.current.emit(index);
            this.index = index;
            this.pages = this.getPages(this.totalPage, index, this.maxPage);
        }
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

    ngOnChanges() {
        this.setPage();
    }
}
