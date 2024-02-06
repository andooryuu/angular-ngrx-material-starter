import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';
import { createPasswordStrengthValidator } from '../validator/password-strength.validator';

@Directive({
  selector: '[passwordStrength]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PasswordStengthDirective,
      multi: true
    }
  ]
})
export class PasswordStengthDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrengthValidator()(control);
  }
}
