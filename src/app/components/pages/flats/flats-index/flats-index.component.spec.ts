import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatsIndexComponent } from './flats-index.component';

describe('FlatsIndexComponent', () => {
  let component: FlatsIndexComponent;
  let fixture: ComponentFixture<FlatsIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlatsIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlatsIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
