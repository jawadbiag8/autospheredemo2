import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ImageAnalyzerComponent } from './image-analyzer/image-analyzer.component';
import { ContentAnalysisComponent } from './content-analysis/content-analysis.component';

export const routes: Routes = [
  { path: '', component: ContentAnalysisComponent },
  { path: 'image', component: ImageAnalyzerComponent },
  { path: 'genAI', component: HomeComponent },

];
