import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListWeeksComponent } from './list-weeks.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
  
describe('ListWeeksComponent', () => {
  let component: ListWeeksComponent;
  let fixture: ComponentFixture<ListWeeksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListWeeksComponent],
      providers: [
      provideHttpClient(),
      provideRouter([])
    ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListWeeksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
