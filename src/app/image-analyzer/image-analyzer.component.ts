import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { AsyncPipe, CommonModule } from '@angular/common'
import { MatCardModule } from '@angular/material/card';
import { FormControl, FormGroup, UntypedFormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-image-analyzer',
  standalone: true,
  imports: [MatTabsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatIconModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    AsyncPipe],
  templateUrl: './image-analyzer.component.html',
  styleUrl: './image-analyzer.component.css'
})
export class ImageAnalyzerComponent implements OnInit {
  imageSrc: string | ArrayBuffer | null = null;
  showoutput = false;
  loding = false;
  resoponce: any;
  apiPath = environment.apipath;
  file: any = null;

  // Define the FormGroup
  form: FormGroup = new FormGroup({
    query: new FormControl('', Validators.required),
    image: new FormControl(null) // This will be used for the file input
  });

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length) {
      const file = target.files[0];
      this.form.patchValue({ image: file });
      this.file = target.files[0];

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        // this.imageSrc = e.target?.result ?? null; // Type assertion to handle null
        // this.imageSrc = e.target?.result as string | ArrayBuffer | null;
        const result = e.target?.result;
        if (result !== undefined) { // Explicit check for 'undefined'
          this.imageSrc = result; // 'result' is 'string | ArrayBuffer | null' at this point
        } else {
          // Handle the unexpected 'undefined' case, maybe set a default image or log an error
          this.imageSrc = null;
        }
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.loding = true;
      const formData = new FormData();
      formData.append('text', `"${this.form.value.query}"`); // Ensure the text is formatted as required

      const file: File = this.form.get('image')?.value;
      if (file) {
        formData.append('image', this.file);
      }

      this.http.post('http://127.0.0.1:5000/submit', formData).subscribe({
        next: (data) => {
          this.resoponce = data;
          this.showoutput = true;
          this.loding = false;
        },
        error: (error) => {
          console.error('Error:', error);
          this.loding = false;
          this.showoutput = false;

        }
      });
    }
  }
}
