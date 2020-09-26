import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PaysPage } from './pays.page';

describe('PaysPage', () => {
  let component: PaysPage;
  let fixture: ComponentFixture<PaysPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaysPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PaysPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
