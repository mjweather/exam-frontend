import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, Routes } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  public Editor = ClassicEditor;

  qid;
  question={
    content:'',
    option1:'',
    option2:'',
    option3:'',
    option4:'',
    answer:'',
    quiz:{}
  }
  constructor(private route:ActivatedRoute,private _sncak:MatSnackBar,private questionService:QuestionService,private router:Router) { }

  ngOnInit(): void {
    this.qid=this.route.snapshot.params.qid;
    this.question.quiz['qid']=this.qid;
  }
  formSubmit(){
    if(this.question.content.trim()==''||this.question.content==null){
      this._sncak.open("Enter content","",{
        duration: 3000
      })
      return;
    }
    if(this.question.option1.trim()==''||this.question.option1==null){
      return;
    }
    if(this.question.option2.trim()==''||this.question.option2==null){
      return;
    }
    if(this.question.option3.trim()==''||this.question.option3==null){
      return;
    }
    if(this.question.option4.trim()==''||this.question.option4==null){
      return;
    }
    if(this.question.answer.trim()==''||this.question.answer==null){
      return;
    }

    this.questionService.addQuestion(this.question).subscribe((data)=>{

      Swal.fire("Success","Question added.","success")
      // this.router.navigate['/admin/view-questions/'+this.qid]
    },(error)=>{
      Swal.fire("Error","Could not add question","warning")
    })
  }

}
