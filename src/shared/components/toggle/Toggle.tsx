import React from 'react';

import { FormControlLabel, Switch } from '@material-ui/core';

import './Toggle.scss';

interface Props {
  value: boolean;
  onChange: Function;
  disabled?: boolean;
}

export default function Toggle(props: Props) {
  return (
    <FormControlLabel
      control={
        <Switch
          className="custom-input"
          checked={props.value}
          onChange={(event) => props.onChange(event.target.checked)}
          color="secondary"
          disabled={props.disabled || false}
        />
      }
      label=""
    />
  );
}
