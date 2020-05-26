import React, { useState, useContext, useEffect } from 'react';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/es';
import 'moment/locale/it';
import 'moment/locale/pt';

import './Datepicker.scss';
import { TranslateContext, TranslateInterface } from '../../../i18n/';
import { utilsService } from '../../../shared/services/utils.service';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';

interface Props {
  value: moment.Moment;
  disabled: boolean;
  onChange: Function;
  maxDate?: moment.Moment;
  minDate?: moment.Moment;
}

export default function Datepicker(props: Props) {
  const context = useContext<null | TranslateInterface>(TranslateContext);
  const [formatInput, setFormatInput] = useState<string>();
  const [openDatepicker, setOpenDatepicker] = useState<boolean>(false);

  useEffect(() => {
    if (context) setFormatInput(utilsService.getDateFormat(context.culture));
  }, [context]);

  return (
    <MuiPickersUtilsProvider locale={context ? context.culture : 'en'} utils={MomentUtils}>
      <KeyboardDatePicker
        disableToolbar
        variant="inline"
        format={formatInput}
        margin="normal"
        value={props.value || ''}
        disabled={props.disabled}
        open={openDatepicker}
        maxDate={props.maxDate}
        minDate={props.minDate}
        onOpen={() => setOpenDatepicker(true)}
        onClose={() => setOpenDatepicker(false)}
        onChange={(date: MaterialUiPickersDate) => {
          setOpenDatepicker(false);
          props.onChange(date);
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
