import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categories',
  templateUrl: './view-categories.component.html',
  styleUrls: ['./view-categories.component.scss']
})
export class ViewCategoriesComponent implements OnInit {

  categories=null;
  constructor(private service:CategoryService) { }

  ngOnInit(): void {
    this.service.category().subscribe(
      (data:any)=>{
        this.categories=data;
        console.log(this.categories);
    }),(error)=>{
      Swal.fire("Error","Can not load file.",'error')
    }
    
    }
    delete(id){
      Swal.fire({
        icon:'info',
        title:'Are you confirm?',
        confirmButtonText:'Delete',
        showCancelButton:true
      }).then((result)=>{
        if(result.isConfirmed){
        console.log("Clicked")
        this.service.deleteCategory(id).subscribe((data)=>{
          this.categories= this.categories.filter((category)=> category.cid !=id);
          Swal.fire("Deleted","Category has been removed",'success')
        }),(error)=>{
          Swal.fire("Error","Can not delete.",'error');
        }
      }
      })
    
    }
  }
  


  