import { AbstractControl, ValidatorFn } from '@angular/forms'
import { Observable, of } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { map, catchError } from 'rxjs/operators'

export class CustomValidators {

    static validateEmail(authService: AuthService) {
        return (control: AbstractControl): Observable<any> => {
            return authService.validateEmail(control.value).pipe(
                map(res => null),
                catchError(error => of({
                    'invalidEmail': true
                }))
            )
        }
    }

    static validatePassword(password: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const confirmPassword = control.value;
            return password !== confirmPassword ? {
                'passwordInvalid': {
                    value: true
                }
            } : null;
        }
    }
}
