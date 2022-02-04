import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from 'src/app/services/category.service';
import { QuizService } from 'src/app/services/quiz.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-quizes',
  templateUrl: './add-quizes.component.html',
  styleUrls: ['./add-quizes.component.scss']
})
export class AddQuizesComponent implements OnInit {

  quiz={
    title:'',
    description:'',
    maxMarks:'',
    numberOfQuestions:'',
    active:true,
    category:{
      cid:''
    }
  };

  categories=null;

  constructor(private service:QuizService,private categoryService:CategoryService,private _snack:MatSnackBar) { }

  ngOnInit(): void {
    this.categoryService.category().subscribe((data)=>{
      this.categories=data;
    },(error)=>{
      Swal.fire("Error","Can not load data","error")
    })
  }

  formSubmit(){
    if(this.quiz.title.trim()=='' ||this.quiz.title==null){
     this._snack.open("Title Required",'',{
       duration: 3000
     })
     return;
    }
    this.service.addQuiz(this.quiz).subscribe((data)=>{
      Swal.fire("Successful","Saved","success")
    },(error)=>{
      Swal.fire("Error","Could not save data","error")
    })
  }
}
