import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectSmall() {
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small-label">City</InputLabel>
      <Select
        labelId="demo-select-small-label"
        id="demo-select-small"
        value={location}
        label="Location"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="dhanbad">Dhanbad</MenuItem>
        <MenuItem value="ranchi">Ranchi</MenuItem>
        <MenuItem value="kolkata">Kolkata</MenuItem>
        <MenuItem value="asansol">Asansol</MenuItem>
        <MenuItem value="delhi">Delhi</MenuItem>
      </Select>
    </FormControl>
  );
}
