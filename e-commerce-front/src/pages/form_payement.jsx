import * as React from 'react';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Radio, { radioClasses } from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Sheet from '@mui/joy/Sheet';
import IconsRadio from './selectpayment';
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { HiOutlineLocationMarker } from "react-icons/hi";

import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
export default function CreditCardForm() {
  return (
 
    <Card
      variant="outlined"
      sx={{
        maxHeight: '100%',
        maxWidth: '40%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        
        bgcolor: 'transparent',
        zIndex: 2,
        top: '-650px',
        right:'350px',
        // borderRadius: '10PX',
        borderColor:'black'
        
      
      }}
      
    >
        <Typography level="title-lg" startDecorator={<InfoOutlined />} >
              Information sur la livraison   
              </Typography>
              <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >

       
<Select
      placeholder="Pays"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 260,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
    >
      <Option value="Madagascar">Madagascar</Option>
     
    </Select>
     
      
    <Select
      placeholder="Ville"
      indicator={<KeyboardArrowDown />}
      sx={{
        width:260,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
        left:'18px'
      
      }}
    >
      <Option value="Fianarantsoa">Fianarantsoa</Option>
     
    </Select>
     
         <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Adress </FormLabel>
          <Input  placeholder="Lot VH 15A" endDecorator={< HiOutlineLocationMarker size={20}  />} />
        </FormControl>
      
      </CardContent>
         

      <Typography level="title-lg" startDecorator={<InfoOutlined />} >
Choisir le mode de payement      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
       <IconsRadio/>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Numéros de carte crédit</FormLabel>
          <Input endDecorator={<CreditCardIcon  />}  placeholder="#### #### #### ####" />
        </FormControl>
        <FormControl>
          <FormLabel>Date d'expiration</FormLabel>
          <Input
        type="date"
        slotProps={{
          input: {
            min: '2024-05-30',
        
          },
        }}
      />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input endDecorator={<InfoOutlined />} />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Nom du propietraire</FormLabel>
          <Input placeholder="Nom et prénom" />
        </FormControl>
      
      
        
        <Checkbox label="Enregistrer" sx={{ gridColumn: '1/-1', my: 1 }} />
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid"  sx={{borderRadius: '10px'}}>
           Effectuer le payment
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
