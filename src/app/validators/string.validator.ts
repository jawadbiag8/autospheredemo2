import { AbstractControl, UntypedFormGroup, ValidationErrors, ValidatorFn } from "@angular/forms";

export class StringValidator {
    static noAllSpaces(control: AbstractControl): ValidationErrors | null {
        try {
            if (!!control.value && typeof control.value == 'string') {
                if (control.value.length > 0 && control.value.trim().length === 0) {
                    return { noAllSpaces: true }
                }
            }
            return null
        } catch (error) {
            return null
        }
    }
    static checkInvalidChars(control: AbstractControl): ValidationErrors | null {
        try {
            let pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[^\s&%|]*$/;
            if (control.value.length > 0 && !pattern.test(control.value)) {
                return { invalidPassword: true };
            }
            return null;
        } catch (error) {
            return null;
        }
    }
    static hasLowerCase(control: AbstractControl): ValidationErrors | null {
        try {
            let pattern = /[a-z]/;
            if (!pattern.test(control.value)) {
                return { hasLowerCase: true };
            }
            return null;
        } catch (error) {
            return null
        }
    }

    static hasUpperCase(control: AbstractControl): ValidationErrors | null {
        try {
            let pattern = /[A-Z]/;
            if (!pattern.test(control.value)) {
                return { hasUpperCase: true };
            }
            return null;
        } catch (error) { return null }
    }

    static hasDigit(control: AbstractControl): ValidationErrors | null {
        try {
            let pattern = /\d/;
            if (!pattern.test(control.value)) {
                return { hasDigit: true };
            }
            return null;
        } catch (error) { return null }
    }

    static hasSpecialChar(control: AbstractControl): ValidationErrors | null {
        try {
            let pattern = /[@$!&%|]/;;
            if (!pattern.test(control.value)) {
                return { hasSpecialChar: true };
            }
            return null;
        } catch (error) { return null }
    }
    static noSpaces(control: AbstractControl): ValidationErrors | null {
        try {
            if (!!control.value && typeof control.value == 'string') {
                if (control.value.length > 0 && control.value.includes(" ")) {
                    return { noSpaces: true }
                }
            }
            return null
        } catch (error) {
            return null
        }
    }

    static hasSpecialCharacters(control: AbstractControl): ValidationErrors | null {
        try {
            var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
            if (format.test(control.value)) {
                return { hasSpecialCharacters: true }
            }
            return null
        } catch (error) {
            return null
        }
    }

}

export function notsame(password: AbstractControl): ValidatorFn {
    return (confirmPassword: AbstractControl): ValidationErrors | null => {
        try {
            if (!!confirmPassword.value && typeof confirmPassword.value == 'string') {
                if (password.value != confirmPassword.value) {
                    return { 'notsame': true }
                }
            }
            return null
        } catch (e) {
            return null
        }
    }
}






export function invalidExtension(extension: string, files: File[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            const filesArray = Array.from(files)
            if (filesArray.some(file => file.name.split(".").pop() != extension)) {
                return { 'invalidExt': true }
            }
            return null
        } catch (e) {
            return null
        }
    }
}





export function notAllowed(value: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        try {
            if (value.includes(control.value.toLowerCase())) {
                return { 'notAllowed': true }
            }
            return null
        } catch (error) {
            return null
        }
    }
}




