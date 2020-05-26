import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import { FormattedMessage } from 'react-intl';
import { RadioGroup, Radio } from '@material-ui/core';

import './Radio.scss';
import RadioOptionInterface from '../../interfaces/radio-option.interface';

interface Props {
  value: string;
  values: RadioOptionInterface[];
  onChange: Function;
}

export default function RadioComponent(props: Props) {
  return (
    <RadioGroup
      className="radio-group"
      value={props.value}
      onChange={(event) => props.onChange(event.target.value)}
    >
      {props.values.map(radioOption => {
        return (
          <FormControlLabel
            key={radioOption.key}
            control={<Radio />}
            value={radioOption.key}
            label={<FormattedMessage id={radioOption.label} />}
          />
        );
      })}
    </RadioGroup>
  );
}
