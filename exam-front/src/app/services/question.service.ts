import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http:HttpClient) {

   }
   public getQuestions(qid){
     return this.http.get(`${baseUrl}/question/quiz/all/${qid}`);

   }
   public addQuestion(question){
    return this.http.post(`${baseUrl}/question/`,question);
   }
   public deleteQuestion(qid){
     return this.http.delete(`${baseUrl}/question/${qid}`)
   }
}
