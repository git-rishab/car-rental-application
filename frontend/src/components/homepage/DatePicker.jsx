import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

export default function ResponsiveDatePickers(props) {
  const currentDate = new Date();
  currentDate.setHours(currentDate.getHours() + props.time);
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const currentDateFormatted = `${year}-${month}-${day}`;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} >
      <DemoContainer
        components={[
          'DatePicker',
          'MobileDatePicker',
          'DesktopDatePicker',
          'StaticDatePicker',
        ]}
      >
        <DemoItem label="" >
          <DatePicker minDate={dayjs(currentDate)} defaultValue={dayjs(currentDateFormatted)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}