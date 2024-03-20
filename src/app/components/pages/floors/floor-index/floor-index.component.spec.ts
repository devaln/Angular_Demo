import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloorIndexComponent } from './floor-index.component';

describe('FloorIndexComponent', () => {
  let component: FloorIndexComponent;
  let fixture: ComponentFixture<FloorIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloorIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FloorIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
