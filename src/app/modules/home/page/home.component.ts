import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {map, Observable} from 'rxjs';
import {HttpService} from '../../../core/services/http.service';
import {Employees} from '../../../shared/interfaces/employees';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  employeeId: number;
  employee$: Observable<Employees | undefined>;

  constructor(private httpService: HttpService, private router: Router) {
    this.employeeId = this.router.getCurrentNavigation()?.extras?.state?.['id'];
  }

  ngOnInit(): void {
    this.employee$ = this.httpService
      .get('/employees')
      .pipe(map((employees: Employees[]) => employees.find(({id}) => id === this.employeeId)));
  }
}
