/* eslint-disable max-lines */
import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import FormLabel from '@material-ui/core/FormLabel';
import moment from 'moment';

import './CustomInput.scss';
import { controlErrorsService } from '../../services/control-errors.service';
import { InputTypesEnum } from '../../enums/input-types.enum';
import CustomValidationInterface from '../../interfaces/custom-validation.interface';
import DropdownOptionInterface from '../../interfaces/dropdown-option.interface';
import TranslationInterface from '../../interfaces/translation.interface';
import RadioOptionInterface from '../../interfaces/radio-option.interface';
import Checkbox from '../checkbox/Checkbox';
import Radio from '../radio/Radio';
import Datepicker from '../datepicker/Datepicker';
import Dropdown from '../dropdown/Dropdown';
import Toggle from '../toggle/Toggle';
import InputNumber from '../input-number/InputNumber';
import InputText from '../input-text/InputText';

interface Props {
  type: InputTypesEnum;
  label?: string | undefined;
  options?: DropdownOptionInterface[];
  value?: any;
  values?: RadioOptionInterface[];
  onChange?: (value?: any) => void;
  disabled?: boolean;
  isActiveValidation?: boolean;
  formName?: string;
  handleValidationChange?: Function;
  required?: boolean;
  pattern?: RegExp;
  patternError?: string;
  id?: string;
  onClick?: (value?: any) => void;
  extraValidations?: (currentValue: any) => any | undefined;
  currencyIsoCode?: string;
  loading?: boolean;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
  hasDecimal?: boolean;
  relevant?: boolean;
}

// eslint-disable-next-line max-lines-per-function
export default function CustomInput(props: Props) {
  const [errorText, setErrorText] = useState<string>();
  const [values, setValues] = useState<string[]>([]);
  const [value, setValue] = useState<any>(props.value);
  const customFieldClass = classNames('custom-field', {
    reverse: props.type === InputTypesEnum.TOGGLE || props.type === InputTypesEnum.CHECK,
    textarea: props.type === InputTypesEnum.TEXTAREA
  });
  const inputClass = classNames('custom-field__input', {
    error: errorText && props.isActiveValidation,
    reverse: props.type === InputTypesEnum.TOGGLE || props.type === InputTypesEnum.CHECK,
  });

  const [validation, setValidation] = useState<CustomValidationInterface>({
    formName: props.formName || '',
    isActiveValidation: props.isActiveValidation || false,
    isValid: true,
    required: (props.required && props.type !== InputTypesEnum.TOGGLE && props.type !== InputTypesEnum.CHECK) || false,
    pattern: props.pattern,
    patternError: props.patternError,
    currentValue: props.value,
    id: props.id,
    extraValidations: props.extraValidations,
  });

  const onChange = (value: any) => {
    setValidation({ ...validation, currentValue: value });
    setValue(value);
    if (props.onChange) props.onChange(value);
  };

  useEffect(() => {
    if (validation.currentValue !== props.value) {
      setValidation({ ...validation, currentValue: props.value });
      return;
    }

    const error: TranslationInterface = controlErrorsService.updateValidation(validation, props.handleValidationChange);
    if (validation.isActiveValidation) {
      setErrorText(error.id);
      setValues(error.values || []);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validation]);

  useEffect(() => {
    setValidation({
      ...validation,
      currentValue: props.value,
    });
    setValue(props.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  useEffect(() => {
    setValidation({
      ...validation,
      isActiveValidation: props.isActiveValidation || false,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.isActiveValidation]);

  useEffect(() => {
    setValidation({
      ...validation,
      pattern: props.pattern,
      patternError: props.patternError
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.pattern, props.patternError]);

  useEffect(() => {
    setValidation({
      formName: props.formName || '',
      id: props.id,
      currentValue: props.value,
      extraValidations: props.extraValidations,
      isActiveValidation: props.isActiveValidation || false,
      pattern: props.pattern,
      patternError: props.patternError,
      required: props.required,
      isValid: validation.isValid
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.formName]);

  return (
    <div className={customFieldClass}>
      {props.label && props.type !== InputTypesEnum.RADIO && (
        <FormLabel htmlFor={props.label} className="input-label">
          <FormattedMessage id={props.label} />
          {props.required && <span>&nbsp;*</span>}
        </FormLabel>
      )}
      <div className={inputClass}>
        {(props.type === InputTypesEnum.TEXT || props.type === InputTypesEnum.TEXTAREA) && (
          <InputText
            type={props.type}
            onChange={onChange}
            onClick={props.onClick}
            disabled={props.disabled}
            value={value}
          />
        )}
        {(props.type === InputTypesEnum.NUMBER || props.type === InputTypesEnum.CURRENCY) && (
          <InputNumber
            type={props.type}
            currencyIsoCode={props.currencyIsoCode}
            value={value}
            disabled={props.disabled}
            hasDecimal={props.hasDecimal}
            onChange={onChange}
          />
        )}
        {props.type === InputTypesEnum.DROPDOWN && props.options && (
          <Dropdown
            value={value}
            disabled={props.disabled}
            options={props.options}
            onChange={onChange}
            loading={props.loading}
          />
        )}
        {props.type === InputTypesEnum.TOGGLE && (
          <Toggle
            value={value}
            onChange={onChange}
            disabled={props.disabled} />
        )}
        {props.type === InputTypesEnum.CHECK && (
          <Checkbox
            value={value}
            checked={value}
            onChange={onChange}
            disabled={props.disabled} />
        )}
        {props.type === InputTypesEnum.DATE && (
          <Datepicker
            value={value}
            disabled={props.disabled || false}
            onChange={onChange}
            maxDate={props.maxDate}
            minDate={props.minDate}
          />
        )}
        {props.type === InputTypesEnum.RADIO && (
          <Radio values={props.values || []} value={props.value} onChange={onChange} />
        )}
        {errorText && validation.isActiveValidation && !validation.isValid && (
          <div className="custom-field__errors">
            <FormattedMessage id={errorText} values={values} />
          </div>
        )}
      </div>
    </div>
  );
}
