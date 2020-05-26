import React from 'react';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

interface Props {
  value: string;
  checked: boolean;
  disabled?: boolean;
  onChange: (isChecked: boolean) => void;
}

export default function CheckboxComponent(props: Props) {
  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={props.checked}
          value={props.value}
          onChange={event => props.onChange(event.target.checked)}
          color="secondary"
          disabled={props.disabled || false}
          inputProps={props.disabled ? { 'aria-label': 'disabled checkbox' } : undefined}
        />
      }
      label=""
    />
  );
}