import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Dictionary } from '@ngrx/entity';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    const errors: { [key: string]: boolean } = {};

    if (!value) {
      return null;
    }

    errors['hasUpperCase'] = /[A-Z]/.test(value);
    errors['hasLowerCase'] = /[a-z]/.test(value);
    errors['hasNumeric'] = /[0-9]+/.test(value);

    const isValid = Object.values(errors).every((value) => value);

    return isValid ? null : { passwordStrength: errors };
  };
}
