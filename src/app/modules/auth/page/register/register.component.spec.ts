import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {lastValueFrom, of, throwError} from 'rxjs';
import {HttpService} from '../../../../core/services/http.service';
import {Countries} from '../../../../shared/interfaces/countries';
import {Employees} from '../../../../shared/interfaces/employees';

import {RegisterComponent} from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  const countries: Countries[] = [
    {
      name: 'Afghanistan',
      code: 'AF',
    },
    {
      name: 'Åland Islands',
      code: 'AX',
    },
    {
      name: 'Albania',
      code: 'AL',
    },
  ];
  const employee: Employees = {
    email: 'diego@diego.com',
    userName: 'example1234',
    password: '12341234',
    fullName: 'Diego Pérez Mansilla',
    country: 'Åland Islands',
    id: 2,
  };
  const form = {
    country: 'countryTest',
    email: 'emailTest',
    fullName: 'fullNameTest',
    password: 'passwordTest',
    userName: 'userNameTest',
  };

  let fakeHttpService = {
    get: jest.fn().mockReturnValue(of(countries)),
    post: jest.fn().mockReturnValue(of(employee)),
  };
  let fakeRouter = {
    navigate: jest.fn(),
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RouterTestingModule],
        declarations: [RegisterComponent],
        providers: [
          {provide: HttpService, useValue: fakeHttpService},
          {provide: Router, useValue: fakeRouter},
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('constructor(): Get the countries', async () => {
    expect(fakeHttpService.get).toHaveBeenCalledWith('/countries');
    await expect(lastValueFrom(component.countries)).resolves.toEqual(countries);
  });

  it('changeCountry()', () => {
    const fakeParam = {target: {value: 'test'}};

    component.changeCountry(fakeParam);

    expect(component.country?.value).toBe(fakeParam.target.value);
  });

  it('onSubmit(): POST api ok response', () => {
    const clearSpy = jest.spyOn(component, 'clear');
    component.form.setValue(form);

    component.onSubmit();

    expect(fakeHttpService.post).toHaveBeenCalledWith('/employees', form);
    expect(fakeRouter.navigate).toHaveBeenCalledWith(['/home'], {state: {id: employee.id}});
    expect(clearSpy).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
  });
  it('onSubmit(): POST api ko response', () => {
    jest.clearAllMocks();
    const clearSpy = jest.spyOn(component, 'clear');
    const consoleError = jest.spyOn(console, 'error');
    fakeHttpService.post = jest.fn().mockReturnValue(throwError(() => new Error('test')));
    component.form.setValue(form);

    component.onSubmit();

    expect(fakeHttpService.post).toHaveBeenCalledWith('/employees', form);
    expect(fakeRouter.navigate).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalled();
    expect(component.isLoading).toBeFalsy();
    expect(clearSpy).toHaveBeenCalled();
  });

  it('clear()', () => {
    const formSpy = jest.spyOn(component.form, 'reset');

    component.clear();

    expect(formSpy).toHaveBeenCalled();
    expect(component.country?.value).toBe('');
  });
});
