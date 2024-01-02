import { HttpClient } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-in',
  standalone:true,
  templateUrl: './sign-in.component.html',
  imports:[FormsModule],
  styleUrls: ['./sign-in.component.css'],
  encapsulation: ViewEncapsulation.None // Permet d'appliquer les styles globalement
})
export class SignInComponent {

  user: any = {
    username: '',
    email: '',
    password: '',
    phoneNumber: '',
    birthDate: ''
  };

  constructor(public dialogRef: MatDialogRef<SignInComponent>, private http: HttpClient) {}

  closeDialog(): void {
    this.dialogRef.close();
  }

  signUp(): void {

    this.http.post<any>('http://localhost:8081/users', this.user).subscribe(
      (response) => {
        console.log('User added successfully', response);
        alert('User added successfully');
      },
      (error) => {
        console.error('Failed to add user', error);
        // Gérer les erreurs lors de l'ajout d'utilisateur
      }
    );
  }
}
