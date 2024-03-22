import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsFormComponent } from './flats-form.component';

describe('FlatsFormComponent', () => {
  let component: FlatsFormComponent;
  let fixture: ComponentFixture<FlatsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatsFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlatsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
