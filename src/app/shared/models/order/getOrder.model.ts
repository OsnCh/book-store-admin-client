import { GetOrderProductModel } from "./getOrderProduct.model";
import { OrderStatus } from 'src/app/common/enums/orderStatus.enum';

export class GetOrderModel{

    constructor(){
        this.products = new Array;
    }

    id: string;
    clientFirstName: string;
    clientLastName: string;
    clientEmail: string;
    orderStatus: OrderStatus;
    amount: number;
    products: Array<GetOrderProductModel>
}