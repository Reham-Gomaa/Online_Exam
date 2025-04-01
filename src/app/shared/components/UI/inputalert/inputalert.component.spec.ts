import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputalertComponent } from './inputalert.component';

describe('InputalertComponent', () => {
  let component: InputalertComponent;
  let fixture: ComponentFixture<InputalertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputalertComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputalertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
