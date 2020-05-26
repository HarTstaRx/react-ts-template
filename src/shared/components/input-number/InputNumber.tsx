import React, { useContext } from 'react';

import NumberFormat from 'react-number-format';
import { InputAdornment, TextField } from '@material-ui/core';

import { TranslateContext, TranslateInterface } from '../../../i18n/';
import { InputTypesEnum } from '../../enums/input-types.enum';

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void;
  onChange: (event: { target: { value: string } }) => void;
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props;
  const context = useContext<null | TranslateInterface>(TranslateContext);

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => { onChange({ target: { value: values.value, } }); }}
      thousandSeparator={context ? context.thousandSeparator : ','}
      decimalSeparator={context ? context.decimalSeparator : '.'}
      isNumericString
    />
  );
}

interface Props {
  type: InputTypesEnum;
  value: string;
  disabled?: boolean;
  onChange: (value?: number | string) => void;
  currencyIsoCode?: string;
  hasDecimal?: boolean;
}

export default function InputNumber(props: Props) {
  return (
    <TextField
      className="custom-input"
      value={
        props.value && props.hasDecimal
          ? parseFloat(props.value).toFixed(3)
          : props.value
            ? props.value
            : 0}
      disabled={props.disabled}
      onChange={(event: any) => {
        props.onChange(!isNaN(event.target.value)
          ? parseFloat(event.target.value.trim())
          : event.target.value);
      }}
      InputLabelProps={{ shrink: true }}
      InputProps={{
        endAdornment: props.type === InputTypesEnum.CURRENCY ? <InputAdornment position="end">{props.currencyIsoCode}</InputAdornment> : <></>,
        inputComponent: NumberFormatCustom as any,
      }}
    />
  );
}
