import {TestBed} from '@angular/core/testing';

import {HttpService} from './http.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {Employees} from '../../shared/interfaces/employees';
import {Countries} from '../../shared/interfaces/countries';
import {lastValueFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';

describe('HttpService', () => {
  let service: HttpService;
  let httpMock: HttpTestingController;

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

  const errorEvent = new ProgressEvent('API error');

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule], providers: [HttpService]});
    service = TestBed.inject(HttpService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('get(/countries): Should get countries', () => {
    let actualResult: any;
    service.get('/countries').subscribe(result => {
      actualResult = result;
    });

    const request = httpMock.expectOne({method: 'GET', url: 'http://localhost:3000/countries'});
    request.flush(countries);

    expect(actualResult).toBe(countries);
  });
  it('get(/countries): Should be error', () => {
    const status = 500;
    const statusText = 'Server error';

    let actualError: HttpErrorResponse | undefined;

    service.get('/countries').subscribe({
      next: () => fail('I have failed you, Anakin'),
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
      complete: () => fail('I have failed you, Anakin'),
    });

    const request = httpMock.expectOne({method: 'GET', url: 'http://localhost:3000/countries'});
    request.error(errorEvent, {status, statusText});
    httpMock.verify();

    if (!actualError) {
      throw new Error('actualError not defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('get(/employees): Should get employee', () => {
    let actualResult: any;
    service.get('/employees').subscribe(result => {
      actualResult = result;
    });

    const request = httpMock.expectOne({method: 'GET', url: 'http://localhost:3000/employees'});
    request.flush(employees);

    expect(actualResult).toBe(employees);
  });
  it('get(/employees): Should be error', () => {
    const status = 500;
    const statusText = 'Server error';

    let actualError: HttpErrorResponse | undefined;

    service.get('/employees').subscribe({
      next: () => fail('I have failed you, Anakin'),
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
      complete: () => fail('I have failed you, Anakin'),
    });

    const request = httpMock.expectOne({method: 'GET', url: 'http://localhost:3000/employees'});
    request.error(errorEvent, {status, statusText});
    httpMock.verify();

    if (!actualError) {
      throw new Error('actualError not defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });

  it('post(/employees): Should post employee', () => {
    let actualResult: any;
    service.post('/employees', employees[0]).subscribe(result => {
      actualResult = result;
    });

    const request = httpMock.expectOne({method: 'POST', url: 'http://localhost:3000/employees'});
    request.flush(employees[0]);

    expect(actualResult).toBe(employees[0]);
  });
  it('post(/employees): Should be error', () => {
    const status = 500;
    const statusText = 'Server error';

    let actualError: HttpErrorResponse | undefined;

    service.post('/employees', employees[0]).subscribe({
      next: () => fail('I have failed you, Anakin'),
      error: (error: HttpErrorResponse) => {
        actualError = error;
      },
      complete: () => fail('I have failed you, Anakin'),
    });

    const request = httpMock.expectOne({method: 'POST', url: 'http://localhost:3000/employees'});
    request.error(errorEvent, {status, statusText});
    httpMock.verify();

    if (!actualError) {
      throw new Error('actualError not defined');
    }
    expect(actualError.error).toBe(errorEvent);
    expect(actualError.status).toBe(status);
    expect(actualError.statusText).toBe(statusText);
  });
});
