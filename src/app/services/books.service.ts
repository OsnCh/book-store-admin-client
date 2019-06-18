import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GetBooksModel } from '../shared/models/book/getBooks.model';
import { Observable } from 'rxjs';
import { AddBookModel } from '../shared/models/book/addBook.model';
import { UpdateBookModel } from '../shared/models/book/updateBook.model';

@Injectable({providedIn: 'root'})
export class BooksService{
    private apiUrl: string;

    constructor(private httpClient:HttpClient){
        this.apiUrl = environment.apiUrl;
    }

    public getBooks(categoryId?: string): Observable<GetBooksModel>{
        let url = `${this.apiUrl}${(categoryId) ? 
            `book/category/${categoryId}` : 'book/all'}`;
        return this.httpClient.get<GetBooksModel>(url);
    }

    public addBook(addModel: AddBookModel): Observable<string>{
        return this.httpClient.post(`${this.apiUrl}book/add`, addModel, 
            { responseType: 'text' });
    }

    public deleteBook(id: string): Observable<string>{
        return this.httpClient.get(`${this.apiUrl}book/delete/${id}`, {responseType: 'text'});
    }

    public updateBook(updateModel: UpdateBookModel): Observable<string>{
        return this.httpClient.post(`${this.apiUrl}book/update`, updateModel,{responseType: 'text'});
    }

    public deleteBooks(ids: Array<string>): Observable<string>{
        return this.httpClient.post(`${this.apiUrl}book/delete`, ids, {responseType: 'text'});
    }
}