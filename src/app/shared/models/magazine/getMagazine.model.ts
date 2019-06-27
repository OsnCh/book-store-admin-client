import { GetMagazinesItemModel } from "./getMagazinesItem.model";
import { GetSelectCategoryModel } from "../category/getSelectCategory.model";

export class GetMagazineModel{
    magazine: GetMagazinesItemModel
    categories: GetSelectCategoryModel[]
}