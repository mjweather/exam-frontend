import { Component, OnInit } from '@angular/core';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-quizes',
  templateUrl: './view-quizes.component.html',
  styleUrls: ['./view-quizes.component.scss']
})
export class ViewQuizesComponent implements OnInit {
  quizes=null;
  constructor( private quiz:QuizService) { }

  ngOnInit(): void {
    this.quiz.quizDisplay().subscribe(
      (data)=>{
        this.quizes = data;
        console.log(data);
      },
      (error)=>{
        Swal.fire("Error","Can not load data.","error")
      }
    )
  }
  delete(id){
    Swal.fire({
      icon:'info',
      title:'Are you confirm?',
      confirmButtonText:'Delete',
      showCancelButton:true
    }).then((result)=>{

      if(result.isConfirmed){
        this.quiz.deleteQuiz(id).subscribe((data)=>{

          this.quizes =this.quizes.filter((quiz)=>quiz.qid !=id); 
          Swal.fire("Successful","Quiz has been removed","success");
        },(error)=>{
          Swal.fire("Error","Could not remove data.","error");
        })
      }
    })
  }

}
