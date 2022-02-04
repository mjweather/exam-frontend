import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  public category(){
    return this.http.get(`${baseUrl}/category/`);
  }
  public addCategory(category){
    return this.http.post(`${baseUrl}/category/`,category);
  }
  public deleteCategory(id){
    return this.http.delete(`${baseUrl}/category/${id}`)
  }
}
