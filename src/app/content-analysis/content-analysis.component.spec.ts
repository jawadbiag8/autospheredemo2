import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentAnalysisComponent } from './content-analysis.component';

describe('ContentAnalysisComponent', () => {
  let component: ContentAnalysisComponent;
  let fixture: ComponentFixture<ContentAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentAnalysisComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContentAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
