import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  query: FormControl = new FormControl('', [Validators.required])
  showoutput = false
  loding=false
  loginForm: any
  resoponce: any
  apipath = environment.apipath;
  constructor(private http: HttpClient,private router: Router) { }
  ngOnInit() {
    this.loginForm = new UntypedFormGroup({
      query: this.query
    })
  }
  gotonext(){
    this.router.navigateByUrl("/image")

  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.loding=true
      console.log(this.loginForm.value)
      const formData = new FormData();
      formData.append("text", this.loginForm.value.query);
      const upload$ = this.http.post(this.apipath + "data", formData);
      upload$.subscribe(
        (data) => {
          this.loding=false
          console.log(data);
          this.resoponce = data
          this.showoutput = true;
        },
        (error) => {
          console.error(error);
          this.loding=false
          this.showoutput = false;
        }

      );

    }
  }
}
