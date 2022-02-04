import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent implements OnInit {

  constructor(private route:ActivatedRoute,
    private quizService:QuizService,
    private category:CategoryService,
    private router:Router) { }

  qid=null;
  quiz=null;
  categories=null;
  ngOnInit(): void {
    this.qid=this.route.snapshot.params.qid;
  
    this.quizService.getQuiz(this.qid).subscribe((data)=>{
      this.quiz=data;
    },(error)=>{
      alert("No quiz data found.")
    })
    this.category.category().subscribe((data)=>{
      this.categories=data;
    },(error)=>{
      alert("No category found.")
    });
  }
  formSubmit(){
    this.quizService
    .updateQuiz(this.quiz).subscribe((data)=>{
      
      Swal.fire("Updated","Data saved.","success");
      this.router.navigate(['/admin/quizes']);
    },(error)=>{
      Swal.fire("Error","Could not update data.","success");
    })
  }
  
}
