import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationformComponent } from './registrationform.component';

describe('RegisterationformComponent', () => {
  let component: RegistrationformComponent;
  let fixture: ComponentFixture<RegistrationformComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationformComponent]
    });
    fixture = TestBed.createComponent(RegistrationformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
