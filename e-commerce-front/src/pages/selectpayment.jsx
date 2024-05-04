

import * as React from 'react';
import Avatar from '@mui/joy/Avatar';
import FormLabel from '@mui/joy/FormLabel';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';

export default function IconsRadio() {
  return (
    <RadioGroup
      aria-label="platform"
      defaultValue="visa"
      overlay
      name="type carte"
      sx={{
        flexDirection: 'row',
        gap: 2,
        [`& .${radioClasses.checked}`]: {
          [`& .${radioClasses.action}`]: {
            inset: -1,
            border: '3px solid',
            borderColor: 'white',


         
          },
        },
        [`& .${radioClasses.radio}`]: {
          display: 'contents',
          '& > svg': {
            zIndex: 2,
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            fontSize:'20px',

            borderRadius: '50%',
          },
        },
      }}
    >
      {['Visa', 'MasterCard', 'PlayPal'].map((value) => (
        <Sheet
          key={value}
          variant="outlined"
          sx={{
            borderRadius: 'md',
            boxShadow: 'sm',
            display: 'flex',
            flexDirection: 'column',
            justifyContent:'space-4',
            alignItems: 'center',
            gap: 1.5,
            p: 2,
            minWidth: 120,
            border: '3px solid',
            borderColor: '#0061A8',
            bgcolor: 'transparent',
          }}
        >
          <Radio id={value} value={value} checkedIcon={<CheckCircleRoundedIcon />} />
          
          <FormLabel htmlFor={value}>{value}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
  );
}