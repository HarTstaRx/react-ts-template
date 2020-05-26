import TranslationInterface from './translation.interface';

export default interface CustomValidationInterface {
  formName: string;
  isActiveValidation: boolean;
  isValid: boolean;
  required?: boolean;
  pattern?: RegExp;
  patternError?: string;
  currentValue?: any;
  id?: string;
  extraValidations?: (currentValue: any) => string | TranslationInterface | undefined;
}
