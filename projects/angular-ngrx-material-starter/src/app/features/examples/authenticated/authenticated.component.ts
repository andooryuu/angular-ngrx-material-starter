import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe } from '@angular/common';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { createPasswordStrengthValidator } from '../../../validator/password-strength.validator';
import { passwordMatchValidator } from '../../../validator/password-match.validator';
import { patternValidator } from '../../../validator/patternValidator';

@Component({
  selector: 'anms-authenticated',
  templateUrl: './authenticated.component.html',
  styleUrls: ['./authenticated.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticatedComponent implements OnInit {
  //myControl = new FormControl('');
  //passwordForm: FormGroup;
  myForm: FormGroup;
  options: string[] = ['Blainville', 'Montréal', 'St-Thérèse'];
  filteredOptions!: Observable<string[]>;
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  hide = true;

  constructor(private form: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.form.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        username: ['', Validators.required],
        phone: ['', Validators.required],
        city: ['', Validators.required],
        gender: ['', Validators.required],
        email: [
          null,
          Validators.compose([Validators.email, Validators.required])
        ],
        password: new FormControl('', {
          validators: [
            Validators.required,
            patternValidator(/\d/, { hasNumber: true }),
            patternValidator(/[A-Z]/, { hasCapitalCase: true }),
            patternValidator(/[a-z]/, { hasSmallCase: true }),
            patternValidator(/[!@#$^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
              hasSpecialCharacters: true
            }),
            Validators.minLength(8)
            /*createPasswordStrengthValidator()*/
          ]
        }) /*['', { validators: [Validators.required, createPasswordStengthValidator()] }],*/,
        confirmPassword: new FormControl('', Validators.required)
      },
      { validators: passwordMatchValidator('password', 'confirmPassword') }
    );
  }
  ngAfterViewInit() {
    this.filteredOptions = this.myForm?.get('city').valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  reset() {
    this.myForm.reset();
  }
  private _filter(value: string): string[] {
    const filterValue = value;
    console.log(filterValue);
    console.log(this.options.filter((option) => option.includes(filterValue)));
    console.log(this.options);
    return this.options.filter((option) => option.includes(filterValue));
  }
}
