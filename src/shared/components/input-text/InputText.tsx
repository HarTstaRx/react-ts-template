import React from 'react';
import { TextField } from '@material-ui/core';
import { InputTypesEnum } from '../../enums/input-types.enum';

interface Props {
  type: InputTypesEnum;
  value?: string;
  disabled?: boolean;
  onClick?: (value?: string) => void;
  onChange?: (value?: string) => void;
}

export default function InputText(props: Props) {
  return (
    <>
      {props.type === InputTypesEnum.TEXT && (
        <TextField
          className="custom-input"
          value={props.value || ''}
          disabled={props.disabled}
          onChange={(event: any) => {
            if (props.onChange) props.onChange(event.target.value);
          }}
          onClick={(event: any) => {
            if (props.onClick) props.onClick(event.target.value);
          }}
          InputLabelProps={{ shrink: true }}
          type="string"
        />
      )}
      {props.type === InputTypesEnum.TEXTAREA && (
        <TextField
          className="custom-input"
          multiline
          rows={4}
          onChange={(event: any) => {
            if (props.onChange) props.onChange(event.target.value);
          }}
          onClick={(event: any) => {
            if (props.onClick) props.onClick(event.target.value);
          }}
          disabled={props.disabled || false}
          value={props.value || ''}
        />
      )}
    </>
  );
}
