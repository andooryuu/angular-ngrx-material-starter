import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn
} from '@angular/forms';

export function passwordMatchValidator(
  passwordKey: string,
  confirmPasswordKey: string
): ValidatorFn {
  return (formGroup: AbstractControl): ValidationErrors | null => {
    const passwordControl = formGroup.get(passwordKey);
    const confirmPasswordControl = formGroup.get(confirmPasswordKey);

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      console.log('ds vsvsv');
      return { passwordMismatch: true };
    } else {
      console.log('yay');
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };
}
