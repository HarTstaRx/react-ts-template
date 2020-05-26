import moment from 'moment';

import CustomValidationInterface from '../interfaces/custom-validation.interface';
import TranslationInterface from '../interfaces/translation.interface';

class ControlErrorsService {
  [forms: string]: any;
  private static _instance: ControlErrorsService;

  private constructor() {
    this.forms = [];
  }

  public static get Instance() {
    return this._instance || (this._instance = new this());
  }

  isRequired(value: any): boolean {
    if (value instanceof moment) return value > moment(0);
    else if (typeof value === 'number' || value instanceof Number) return value !== 0;
    else return !!(value && value.length > 0);
  }

  registerForm(formName: string) {
    this.forms[formName] = [];
  }

  registerProp(prop: CustomValidationInterface) {
    if (!prop.formName || !this.forms[prop.formName]) return;
    let isInsert: boolean = true;
    this.forms[prop.formName].forEach(
      (validation: CustomValidationInterface, index: number, array: CustomValidationInterface[]) => {
        if (validation.id === prop.id) {
          array[index] = this.validateProp(prop);
          isInsert = false;
        }
      }
    );
    if (isInsert) this.forms[prop.formName].push(prop);
  }

  unregisterProp(formName: string, propId: string) {
    if (!this.forms[formName]) return;
    this.forms[formName] = this.forms[formName].filter((p: CustomValidationInterface) => p.id !== propId);
  }

  validateProp(prop: CustomValidationInterface): CustomValidationInterface {
    let isValid: boolean = true;
    if (prop.required) {
      isValid = this.isRequired(prop.currentValue);
    }
    if (prop.pattern) {
      isValid = isValid && prop.pattern.test(prop.currentValue);
    }
    if (prop.extraValidations) {
      const validationResult: any = prop.extraValidations(prop.currentValue);
      if (validationResult) isValid = isValid && validationResult.length === 0;
    }
    prop.isValid = isValid;
    return prop;
  }

  validateForm(formName: string): boolean {
    if (!formName || !this.forms[formName]) return false;

    this.forms[formName].forEach((validation: CustomValidationInterface) => {
      validation.isActiveValidation = true;
    });

    return this.forms[formName]
      ? this.forms[formName]
        .map((prop: CustomValidationInterface) => this.validateProp(prop))
        .map((prop: CustomValidationInterface) => prop.isValid)
        .every((valid: boolean) => valid === true)
      : false;
  }

  updateValidation(validation: CustomValidationInterface, handleValidationChange?: Function): TranslationInterface {
    this.registerProp(validation);
    let error: TranslationInterface = {
      id: '',
    };
    if (validation.required) {
      error.id = !this.isRequired(validation.currentValue) ? 'shared.requiredError' : '';
    }
    if (error.id.length === 0 && validation.pattern && validation.currentValue) {
      error.id = !validation.pattern.test(validation.currentValue)
        ? validation.patternError || 'shared.invalidFormat'
        : '';
    }
    if (error.id.length === 0 && validation.extraValidations) {
      const result: any = validation.extraValidations(validation.currentValue);
      if (result && result.id) {
        return result;
      } else if (result) {
        error.id = result;
      }
    }

    if (validation.isActiveValidation && handleValidationChange)
      handleValidationChange(this.validateForm(validation.formName));

    return error;
  }
}

export const controlErrorsService = ControlErrorsService.Instance;
