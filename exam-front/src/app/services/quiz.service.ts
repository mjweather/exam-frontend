import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(private http:HttpClient) { }
  public quizDisplay(){
    return this.http.get(`${baseUrl}/quiz/`);
  }
  public addQuiz(quiz:any){
    return this.http.post(`${baseUrl}/quiz/`,quiz);
  }
  public deleteQuiz(id){
    return this.http.delete(`${baseUrl}/quiz/${id}`)
  }
  public getQuiz(id){
    return this.http.get(`${baseUrl}/quiz/${id}`);
  }
  public updateQuiz(quiz){
    return this.http.put(`${baseUrl}/quiz/`,quiz);
  }
}
