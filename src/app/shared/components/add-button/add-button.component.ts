import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.scss']
})
export class AddButtonComponent{

  @Input('disabled') disabled: boolean;
  @Output() clickwithdisabled: EventEmitter<any> = new EventEmitter();

  constructor() {
   }

}
