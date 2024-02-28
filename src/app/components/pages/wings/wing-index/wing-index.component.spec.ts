import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WingIndexComponent } from './wing-index.component';

describe('WingIndexComponent', () => {
  let component: WingIndexComponent;
  let fixture: ComponentFixture<WingIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WingIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WingIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
