import { GetMagazinesItemModel } from "../magazine/getMagazinesItem.model";
import { GetBooksItemModel } from "../book/getBooksItem.model";
import { ProductType } from 'src/app/common/enums/productType.enum';

export class GetOrderProductModel{
    id: string;
    type: ProductType;
    product: GetMagazinesItemModel | GetBooksItemModel;
    count: number;
}