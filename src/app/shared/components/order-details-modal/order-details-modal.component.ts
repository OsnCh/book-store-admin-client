import { Component, OnInit, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GetOrderModel } from '../../models/order/getOrder.model';
import { OrderStatus } from 'src/app/common/enums/orderStatus.enum';

@Component({
  selector: 'app-order-details-modal',
  templateUrl: './order-details-modal.component.html',
  styleUrls: ['./order-details-modal.component.scss']
})
export class OrderDetailsModalComponent implements OnInit {

  @ViewChild('select') select;

  public order: GetOrderModel;
  public mapStatus: { value: string; name: string}[];

  constructor(private dialogRef: MatDialogRef<OrderDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any){}

  ngOnInit() {
    this.order = this.data;
    this.mapStatus = new Array;
    this.mapStatus = [
      {name: 'Closed', value: OrderStatus.WAITINGCONFIRMATION},
      {name: 'Waiting for confirmation', value: OrderStatus.WAITINGCONFIRMATION},
      {name: 'Active', value: OrderStatus.WAITINGCONFIRMATION},
      {name: 'Canceled', value: OrderStatus.WAITINGCONFIRMATION}
    ]
  }



  onNoClick(): void {
    this.dialogRef.close();
  }

}
