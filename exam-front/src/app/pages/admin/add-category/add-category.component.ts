import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {

  category={
    "title":'',
    "description":''
  }
  constructor(private service:CategoryService) { }

  ngOnInit(): void {
  }

  public formSubmit(){
    if(this.category.title.trim()=='' || this.category.title==null){
      Swal.fire("Error","Please Enter Title","error");
      return;
    }
    this.service.addCategory(this.category).subscribe((data:any)=>{
      this.category.title='';
      this.category.description='';
      Swal.fire("successful","Category Id:"+data.cid,"success");

    }),(error)=>{
      Swal.fire("Error","Something Went Wrong","error");
    }
  }
}
