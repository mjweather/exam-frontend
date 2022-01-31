import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }
  loginData={
    username:'',
    password:''

  };

  ngOnInit(): void {
  }

  formSubmit(){
    if(this.loginData.username.trim()==''||this.loginData.username==null){
      this.snack.open("Enter valid username",'',{
        duration: 3000
      })
    }
    if(this.loginData.password.trim()==''||this.loginData.password==null){
      this.snack.open("Enter valid password",'',{
        duration: 3000
      })
    }

    this.login.generateToken(this.loginData).subscribe(
      (data:any)=>{
        console.log(data);
        console.log("success")

        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
            (user:any)=>{
              this.login.setUser(user);
              console.log(user); 

              if(this.login.getUserRole()=='ADMIN'){
                // window.location.href="/admin"
                this.router.navigate(['admin'])
                this.login.loginStatusSubject.next(true);
              }else if(this.login.getUserRole()=='NORMAL'){
                this.router.navigate(['user-dashboard'])
              }
              
            }
        );
      },
      (error)=>{
        console.log("error")
      }
    )
      
    }

  }


