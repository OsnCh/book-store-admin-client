import { Component, OnInit, ViewChild } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { GetOrderModel } from 'src/app/shared/models/order/getOrder.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { OrderDetailsModalComponent } from 'src/app/shared/components/order-details-modal/order-details-modal.component';

const paginatorSize = 5;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('paginator') paginator: MatPaginator;

  public displayedColumns = ['firstname', 'lastname', 'email', 'amount', 'details'];

  public orders: Array<GetOrderModel>
  private dataSource: MatTableDataSource<GetOrderModel>;

  constructor(private orderService: OrderService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.orderService.getAll().subscribe((data) => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
      this.configPaginator();
      console.log(this.orders);
    })
  }

  private configPaginator() {
    let paginatorSizes = new Array<number>();
    for (let i = 1; i < this.dataSource.data.length / paginatorSize +
      (this.dataSource.data.length % paginatorSize == 0 ? 0 : 1); i++) {
      paginatorSizes.push(i * paginatorSize);
    }
    this.dataSource.paginator = this.paginator;
    this.dataSource.paginator.pageSizeOptions = paginatorSizes;
  }

  public openModal(order: GetOrderModel){
    this.dialog.open(OrderDetailsModalComponent, {
      data: order,
      minWidth: '400px',
      maxWidth: '700px',
      width: 'inherit'
    });
  }
  

}
