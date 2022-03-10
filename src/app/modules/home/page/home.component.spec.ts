import {ComponentFixture, TestBed} from '@angular/core/testing';
import {Router} from '@angular/router';
import {lastValueFrom, of} from 'rxjs';
import {HttpService} from '../../../core/services/http.service';
import {Employees} from '../../../shared/interfaces/employees';

import {HomeComponent} from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const employees: Employees[] = [
    {
      email: 'diego@diego.com',
      userName: 'example1234',
      password: '12341234',
      fullName: 'Diego Pérez Mansilla',
      country: 'Åland Islands',
      id: 2,
    },
    {
      email: 'diego2@diego.com',
      userName: '2example1234',
      password: '12341234',
      fullName: 'Carlos Alfredo Lucía',
      country: 'Spain',
      id: 3,
    },
  ];

  let fakeHttpService = {
    get: jest.fn().mockReturnValue(of(employees)),
  };
  let fakeRouter = {
    navigate: jest.fn(),
    getCurrentNavigation: jest.fn().mockReturnValue({
      extras: {
        state: {
          id: employees[0].id,
        },
      },
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        {provide: HttpService, useValue: fakeHttpService},
        {provide: Router, useValue: fakeRouter},
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('constructor(): Get employeeId', () => {
    expect(fakeHttpService.get).toHaveBeenCalled();
    expect(component.employeeId).toBe(employees[0].id);
  });

  it('ngOnInit(): GET api ok response', async () => {
    jest.clearAllMocks();

    component.ngOnInit();

    expect(fakeHttpService.get).toHaveBeenCalledWith('http://localhost:3000/employees');
    await expect(lastValueFrom(component.employee$)).resolves.toEqual(employees[0]);
  });
});
