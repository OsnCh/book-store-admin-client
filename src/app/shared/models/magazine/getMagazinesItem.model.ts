import { GetSelectCategoryModel } from "../category/getSelectCategory.model";

export class GetMagazinesItemModel{
    id: string;
    price: number;
    category: GetSelectCategoryModel;
    name: string;
    description: string;
    isActive: boolean;
}