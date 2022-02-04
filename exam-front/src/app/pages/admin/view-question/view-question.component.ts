import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.scss']
})
export class ViewQuestionComponent implements OnInit {

  qid;
  title;
  questions=null;
  constructor(private route:ActivatedRoute,private service: QuestionService) { }

  ngOnInit(): void {
    this.qid=this.route.snapshot.params.qid;
    this.title=this.route.snapshot.params.title;
    console.log('id:'+this.qid);
    this.service.getQuestions(this.qid).subscribe((data)=>{
      this.questions=data;
      console.log(data);
    },(error)=>{

    })

  }
  delete(qid){

    Swal.fire({
      icon:'info',
        title:'Are you confirm?',
        confirmButtonText:'Delete',
        showCancelButton:true
    }).then((result)=>{
      if(result.isConfirmed){
        this.service.deleteQuestion(qid).subscribe((data)=>{

          console.log(qid);

          this.questions=this.questions.filter((ques)=> ques.quesId != qid);
          Swal.fire("successful","Question has removed","success")
        },(error)=>{
          Swal.fire("Error","Could not delete question.","error")
        })
      }
    })

  }

}
