import { GetMagazinesModel } from '../shared/models/magazine/getMagazines.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { AddMagazineModel } from '../shared/models/magazine/addMagazine.model';
import { UpdateMagazineModel } from '../shared/models/magazine/updateMagazine.model';

@Injectable({providedIn: 'root'})
export class MagazinesService{

    constructor(private httpClient:HttpClient){}

    public getMagazines(categoryId?: string): Observable<GetMagazinesModel>{
        let url = `${environment.apiUrl}${(categoryId) ? 
            `magazine/category/${categoryId}` : 'magazine/all'}`;
        return this.httpClient.get<GetMagazinesModel>(url);
    }

    public addMagazine(model: AddMagazineModel): Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}magazine/add`, 
            model, {responseType: 'text'});
    }

    public updateMagazines(model: UpdateMagazineModel): Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}magazine/update`, model, {responseType: 'text'})
    }

    public delete(ids: Array<string>): Observable<string>{
        return this.httpClient.post(`${environment.apiUrl}magazine/delete`, ids, { responseType: 'text' })
    }
}