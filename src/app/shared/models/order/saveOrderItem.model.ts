import { ProductType } from 'src/app/common/enums/productType.enum';


export class SaveOrderItemModel{
    id: string;
    type: ProductType;
    count: number;
}