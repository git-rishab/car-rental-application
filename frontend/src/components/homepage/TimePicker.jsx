import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';


export default function Time(props) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + props.time);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const currentTime = `${year}-${month}-${day}T${hours}:${minutes}`;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer
        components={[
          'TimePicker',
          'MobileTimePicker',
          'DesktopTimePicker',
          'StaticTimePicker',
        ]}
      >
        <DemoItem label="">
          <MobileTimePicker defaultValue={dayjs(currentTime)} />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
// 