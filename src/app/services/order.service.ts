import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetOrderModel } from '../shared/models/order/getOrder.model';
import { environment } from 'src/environments/environment.prod';

@Injectable()
export class OrderService{

    constructor(private httpClient: HttpClient){}

    getAll(): Observable<Array<GetOrderModel>>{
        return this.httpClient.get<Array<GetOrderModel>>(`${environment.apiUrl}order/all`);
    }

}