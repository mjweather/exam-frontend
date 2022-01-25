import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private userService:UserService,private _snackBar:MatSnackBar) { }

  public user={
    userName:'',
    password:'',
    firstName:'',
    lastName:'',
    phone:'',
    email:''
  };

  ngOnInit(): void {
  }
  formSubmit(){
    console.log(this.user)
    if(this.user.userName==null ||this.user.userName==''){
      // alert("Please enter username")
      this._snackBar.open('Please enter username','',{
        duration: 2000
      });

    }
    else{
      this.userService.addUser(this.user).subscribe(
        (data:any)=>{
          console.log(this.user)
          // alert("Successfully saved")
          // this._snackBar.open('Successfully saved','',{
          //   duration: 2000
          // });
          Swal.fire("Successfull","Your id: "+data.id,"success")
        },
        (error)=>{
          // alert("Failed to register")
          this._snackBar.open('Failed to register','',{
            duration: 2000
          });
        }
      )
    }
  }

}
