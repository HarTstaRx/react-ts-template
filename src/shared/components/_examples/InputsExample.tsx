import React, { useState, useEffect, useCallback, useContext } from 'react';
import { useIntl } from 'react-intl';
import CustomInput from '../custom-input/CustomInput';
import { InputTypesEnum } from '../../enums/input-types.enum';
import moment from 'moment';
import DropdownOptionInterface from '../../interfaces/dropdown-option.interface';
import { exampleService } from '../../services/examples.services';
import { TranslateContext } from '../../../i18n';
import RadioOptionInterface from '../../interfaces/radio-option.interface';
import CurrencyInterface from '../../interfaces/example-currency.interface';
import { utilsService } from '../../services/utils.service';

interface ExampleModel {
  text: string;
  textArea: string;
  number: number;
  check?: boolean;
  toggle: boolean;
  dropdown: string;
  datepicker?: moment.Moment;
  radio: string;
  currency: string;
}

// eslint-disable-next-line max-lines-per-function
export default function InputsExample() {
  const intl = useIntl();
  const [model, setModel] = useState<ExampleModel>({
    text: '',
    textArea: '',
    number: 0,
    toggle: false,
    dropdown: '',
    datepicker: moment(),
    radio: '',
    currency: ''
  });

  const [languages, setLanguages] = useState<DropdownOptionInterface[]>([]);
  const [currencies, setCurrencies] = useState<CurrencyInterface[]>([]);
  const [currency, setCurrency] = useState<CurrencyInterface>();
  const [radioValues, setRadioValues] = useState<RadioOptionInterface[]>([]);
  const context = useContext(TranslateContext);

  const getLanguages = useCallback(async (): Promise<DropdownOptionInterface[]> => {
    const langs = await exampleService.getLanguages();
    return langs.map(l => {
      return {
        key: l.key,
        text: intl.formatMessage({ id: l.text })
      };
    });
  }, [intl]);

  const getRadioValues = useCallback(async (): Promise<RadioOptionInterface[]> => {
    return await exampleService.getRadioValues();
  }, []);

  const getCurrencies = useCallback(async (): Promise<CurrencyInterface[]> => {
    const result = await exampleService.getCurrencies();
    return result;
  }, []);

  useEffect(() => {
    getLanguages().then(setLanguages);
    getRadioValues().then(setRadioValues);
    getCurrencies().then(setCurrencies);
  }, [getLanguages, getRadioValues, getCurrencies]);

  return (
    <div>
      <CustomInput 
        type={InputTypesEnum.TEXT}
        label="examples.inputs.text"
        value={model ? model.text : ''}
        onChange={(newValue?: string) => setModel({ ...model, text: newValue || '' })} />
      <CustomInput 
        type={InputTypesEnum.TEXTAREA}
        label="examples.inputs.textArea"
        value={model ? model.textArea : ''}
        onChange={(newValue?: string) => setModel({ ...model, textArea: newValue || '' })} />
      <CustomInput 
        type={InputTypesEnum.NUMBER}
        label="examples.inputs.number"
        value={model ? model.number : ''}
        onChange={(newValue?: number) => setModel({ ...model, number: newValue || 0 })} />
      <CustomInput 
        type={InputTypesEnum.TOGGLE}
        label="examples.inputs.toggle"
        value={model ? model.toggle : ''}
        onChange={(newValue?: boolean) => setModel({ ...model, toggle: newValue || false })} />
      <CustomInput 
        type={InputTypesEnum.DROPDOWN}
        label="examples.inputs.dropdown"
        options={languages}
        value={model ? model.dropdown : ''}
        onChange={(newValue?: string) => {
          setModel({ ...model, dropdown: newValue || '' });
          context?.switchLanguage(newValue?.split('_')[0]);
        }} />
      {/* <CustomInput 
        type={InputTypesEnum.DATE}
        label="examples.inputs.datepicker"
        value={model ? model.datepicker : ''}
        onChange={(newValue?: moment.Moment) => setModel({ ...model, datepicker: newValue })} /> */}
      <CustomInput 
        type={InputTypesEnum.RADIO}
        label="examples.inputs.radio"
        values={radioValues}
        value={model ? model.radio : ''}
        onChange={(newValue?: string) => setModel({ ...model, radio: newValue || '' })} />
      <CustomInput 
        type={InputTypesEnum.DROPDOWN}
        label="examples.inputs.currencies"
        options={utilsService.convertToDropdown(currencies, ['icon', 'name'])}
        value={model ? model.dropdown : ''}
        onChange={(newValue?: string) => {
          setCurrency(currencies.find(c => c.icon === newValue));
          setModel({ ...model, currency: newValue || '' });
        }} />
      <CustomInput 
        type={InputTypesEnum.CURRENCY}
        label="examples.inputs.currency"
        value={model ? model.currency : ''}
        currencyIsoCode={currency ? currency.icon : ''}
        onChange={(newValue?: string) => setModel({ ...model, currency: newValue || '' })} />
    </div>);
}