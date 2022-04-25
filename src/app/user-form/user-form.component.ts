import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
})
export class UserFormComponent implements OnInit {
  // Variable declarations
  users: any;

  // Form Control Variables
  name: string = '';
  job: string = '';

  // Bazse URL for apis
  baseUrl = 'https://reqres.in/';

  // initializing the form
  userForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    job: ['', [Validators.required]],
  });

  constructor(private http: HttpClient, private fb: FormBuilder) {}

  async ngOnInit(): Promise<any> {
    // Example of usage of http get call
    const getUsersUrl = this.baseUrl + 'api/users?page=2';

    // Getting all the users and showing them on the dashboard
    this.users = await this.http.get(getUsersUrl).toPromise();
    console.log('Users List: ', this.users);
  }

  async createUser(form: FormGroup) {
    if (!form.valid) {
      alert('invalid form inputs....!');
      return;
    }
    const postUserUrl = this.baseUrl + 'api/users';
    const payload = {
      name: this.name,
      job: this.job,
    };
    // Creating a new user
    try {
      const res = await this.http.post(postUserUrl, payload).toPromise();
      console.log('Respose after user creation: ', res);
      alert('Form submitted Successfully...!');
    } catch (error) {
      console.log('Error while submitting the form');
      alert('Error while submitting the form...!');
    }
  }
}
