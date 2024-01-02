import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  user : any ={ email :'', password :''}; 
  constructor(public dialogRef: MatDialogRef<LoginComponent>, private http: HttpClient) {} 

  closeDialog(): void {
    this.dialogRef.close();
  }

  login(): void {

    this.http.post<any>('http://localhost:8081/login', this.user).subscribe(
      (response) => {
        console.log('Response from server:', response);
        alert("Vous etes connectée à votre compte");

       
      },
      (error) => {
        console.error('Error during login:', error);
        alert("User not found")
      }
    );
  }
}
