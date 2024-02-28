import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WingFormComponent } from './wing-form.component';

describe('WingFormComponent', () => {
  let component: WingFormComponent;
  let fixture: ComponentFixture<WingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WingFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
