import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCourseComponent } from './list-course.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('ListCourseComponent', () => {
  let component: ListCourseComponent;
  let fixture: ComponentFixture<ListCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListCourseComponent],
      providers: [
      provideHttpClient(),
      provideRouter([])
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
