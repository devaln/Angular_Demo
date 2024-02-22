import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocietyIndexComponent } from './society-index.component';

describe('SocietyIndexComponent', () => {
  let component: SocietyIndexComponent;
  let fixture: ComponentFixture<SocietyIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocietyIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SocietyIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
