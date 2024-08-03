import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function LanguageSelector() {
  const [language, setLanguage] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setLanguage(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="language-select-label">Dil Seçimi</InputLabel>
      <Select
        labelId="language-select-label"
        id="language-select"
        value={language}
        label="Dil Seçimi"
        onChange={handleChange}
      >
        <MenuItem value="tr">Türkçe</MenuItem>
        <MenuItem value="en">İngilizce</MenuItem>
        <MenuItem value="de">Almanca</MenuItem>
      </Select>
    </FormControl>
  );
}
