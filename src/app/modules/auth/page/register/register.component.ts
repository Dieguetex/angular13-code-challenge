import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {HttpService} from '../../../../core/services/http.service';
import {Countries} from '../../../../shared/interfaces/countries';
import {Employees} from '../../../../shared/interfaces/employees';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  countries: Observable<Countries[]>;
  validUserNamePattern = '^[a-zA-Z0-9]{8,}$';
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    userName: ['', [Validators.required, Validators.pattern(this.validUserNamePattern)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    fullName: [''],
    country: ['', [Validators.required]],
  });

  isLoading = false;

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.countries = this.httpService.get('/countries');
  }

  get email(): AbstractControl | null {
    return this.form.get('email');
  }
  get userName(): AbstractControl | null {
    return this.form.get('userName');
  }
  get password(): AbstractControl | null {
    return this.form.get('password');
  }
  get fullName(): AbstractControl | null {
    return this.form.get('fullName');
  }
  get country(): AbstractControl | null {
    return this.form.get('country');
  }

  changeCountry(e: any): void {
    this.country?.setValue(e.target.value, {
      onlySelf: true,
    });
  }

  onSubmit(): void {
    this.isLoading = true;

    this.httpService.post('/employees', this.form.value).subscribe({
      next: ({id}: Employees) => {
        /* TODO: employeeRes has the data just created, the Frontend_Coding_Challenge_Instructions.pdf says that a new call has to be created but i'd prefer to send the whole data by ActivatedRoute... */
        this.router.navigate(['/home'], {state: {id}});
        this.clear();
        this.isLoading = false;
      },
      error: e => {
        console.error(e);
        this.clear();
        this.isLoading = false;
      },
    });
  }

  clear(): void {
    this.form.reset();
    this.country?.setValue('');
  }
}
