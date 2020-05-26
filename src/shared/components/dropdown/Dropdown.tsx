import React, { useState, useEffect } from 'react';

import { FormattedMessage } from 'react-intl';
import { Icon, IconButton, FormControl, Select, MenuItem, CircularProgress } from '@material-ui/core';

import './Dropdown.scss';

interface Props {
  value: string;
  disabled?: boolean;
  options: any[];
  onChange: Function;
  loading?: boolean;
}

export default function Dropdown(props: Props) {
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasNoData, setHasNoData] = useState<boolean>(false);

  useEffect(() => {
    if (props.loading === true) {
      setIsLoading(true);
    }
    else if (isLoading === true && props.loading === false && props.options.length === 0) {
      setIsLoading(false);
      setHasNoData(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

  useEffect(() => {
    if (props.options.length > 0) {
      setHasNoData(false);
    }
  }, [props.options]);

  return (
    <FormControl className="custom-field__dropdown custom-input" variant="outlined">
      <Select
        disabled={props.disabled || props.loading || hasNoData || false}
        IconComponent={() => {
          if (props.loading) return <CircularProgress className="loading" size={20} />;
          return (
            <IconButton onClick={() => setOpenSelect(true)} disabled={props.disabled || props.loading || hasNoData || false}>
              <Icon color="primary"> {'expand_more'}</Icon>
            </IconButton>
          );
        }}
        open={openSelect}
        value={props.value || ''}
        onOpen={() => setOpenSelect(true)}
        onClose={() => setOpenSelect(false)}
        onChange={(event: any) => {
          setOpenSelect(false);
          props.onChange(event.target.value);
        }}>
        {props.options.map((option, index) => {
          return (
            <MenuItem key={index} value={option.key}>
              {option.text}
            </MenuItem>
          );
        })}
      </Select>
      {hasNoData && (
        <span className="no-data"><FormattedMessage id="shared.noData" /></span>
      )}
    </FormControl>
  );
}
