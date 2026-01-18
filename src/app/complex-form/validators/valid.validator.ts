import { AbstractControl, ValidatorFn } from "@angular/forms";
import { ValidationErrors } from "@angular/forms";

export function validValidator(): ValidatorFn{
    return (ctrl: AbstractControl): null | ValidationErrors => {
        if(ctrl.value.includes('VALID')){
            return null;
        } else {
            return {
                validValidator: ctrl.value
            }
        }
    }
}