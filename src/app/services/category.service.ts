import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetCategoriesModel } from '../shared/models/category/getCategories.model';
import { environment } from 'src/environments/environment';
import { AddCategoryModel } from '../shared/models/category/addCategory.model';
import { UpdateCategoryModel } from '../shared/models/category/updateCategory.model';

@Injectable({ providedIn: 'root' })
export class CategoryService{
    constructor(private httpClient:HttpClient){
        this.apiUrl = environment.apiUrl;
    }

    private apiUrl:string;

    getAllCategories():Observable<GetCategoriesModel>{
        return this.httpClient.get<GetCategoriesModel>(`${this.apiUrl}category/all`);
    }

    addCategory(item: AddCategoryModel): Promise<string>{
        return this.httpClient.post(`${this.apiUrl}category/add`, item, { responseType: 'text' }).toPromise();
    }

    updateCategory(model: UpdateCategoryModel): Observable<string>{
        return this.httpClient.post(`${this.apiUrl}category/update`, model, { responseType: 'text' });
    }

    deleteCategory(id: string): Observable<string>{
        return this.httpClient.get(`${this.apiUrl}category/delete/${id}`, { responseType: 'text' });
    }
}