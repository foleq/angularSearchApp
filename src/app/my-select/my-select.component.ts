import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export interface ISelectItem {
  id: string | number;
  text: string;
  disabled?: boolean;
}

@Component({
  selector: 'app-my-select',
  templateUrl: './my-select.component.html',
  styleUrls: ['./my-select.component.css']
})
export class MySelectComponent implements OnInit {

  @Input() items: ISelectItem[];
  @Input() selectedItem: ISelectItem;

  @Output() itemSelected: EventEmitter<ISelectItem> = new EventEmitter<ISelectItem>();

  constructor() { }

  ngOnInit() {
  }

  itemChanged(selectedItem: ISelectItem) {
    this.itemSelected.emit(selectedItem);
  }
}
