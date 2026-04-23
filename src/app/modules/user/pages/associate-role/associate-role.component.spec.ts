import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateRoleComponent } from './associate-role.component';

describe('AssociateRoleComponent', () => {
  let component: AssociateRoleComponent;
  let fixture: ComponentFixture<AssociateRoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociateRoleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociateRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
