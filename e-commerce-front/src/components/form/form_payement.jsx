import InputMask from 'react-input-mask';
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';

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
import Select, { selectClasses } from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import { HiOutlineLocationMarker } from "react-icons/hi";
import {Inputhandler} from "../../Hooks/Inputhandler";
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import { LoadingContext } from "../../Hooks/LoadingContext";
import { useState, useEffect, useContext } from "react";
import {
  creationpurchase,
  creationorders,
  validationPayement,
} from "../../Hooks/PayementApi";
import { CartContext } from "../../Hooks/PanierContexte";
import Swal from "sweetalert2";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
export default function CreditCardForm() {
  const { items, emptyCart, getTotalCost } = useContext(CartContext);
  const { loading, startLoading, stopLoading } = useContext(LoadingContext);
  const [adress, setAdresse, adresschange] = Inputhandler("");
    const [account_number, setAccount_number, numcomptechange] = Inputhandler("");
    const [pays, setPays] = useState("");
    const [payement_mode, setPayement_mode, payementchange] =Inputhandler("");
    const [ville, setVille] = useState("");
    const handlevile = (event, newValue) => {
      setVille(newValue);
    };
    const villes =[
      "Ambatondrazaka", "Antananarivo", "Antsiranana", "Antsohihy", "Farafangana",
      "Fianarantsoa", "Mahajanga", "Maintirano", "Manakara", "Mananjary", "Moramanga",
      "Morondava", "Nosy Be", "Sainte Marie", "Sambava", "Tolagnaro", "Toliary", "Toamasina"
    ]
    const handlepays = (event, newValue) => {
      setPays(newValue);
    };
    const resetform = () => {
      setAdresse("");
      setAccount_number("");
      setNumcompte("");
    };
    const Totalmontant = getTotalCost();
    const montant = {
      montant: Totalmontant,
    };
  
    const formData = {
      address: adress,
      payement_mode: payement_mode,
      account_number: account_number,
      pays: pays,
      ville: ville
    };
  
    const paymentsubmit =  async (e) => {
   
      e.preventDefault();
      startLoading();
      if(adress && payement_mode && account_number && pays && ville ){
           
      const responseData = await creationpurchase(formData);
         
          if (responseData.status == 201) {
              const formorder = {
                purchaseId: responseData.data.id,
                indexes: (function () {
                  
                  const indexes = [];
                  let index = 1; 
                  for (const key in items) {
                    indexes.push(index);
                    index++;
                  }
                  return indexes;
                })(),
                orders: items.map((item) => ({
                  purchase: responseData.data.id,
                  product: item.id,
                  quantity: item.quantity,
                })),
              };
            console.log(formorder);
            
              const responseorder =  await creationorders(formorder);
                 if (responseorder.status == 201) {
                 
                 console.log(responseorder);
                   const responseData = await validationPayement(montant);
                  console.log(responseData);
                 
                  setTimeout(3000)
                  if (responseData.status == 200) {
                    resetform()
                Swal.fire({
              title: "Information",
              text: "Votre payement a été effectué",
              icon: "success",
              confirmButtonText: "Oui",
                });
              
                emptyCart();
                stopLoading()
            }
  
                 
            } else if (responseorder.status == 500) {
              
              setTimeout(3000)
                   Swal.fire({
                     title: "Erreur",
                     text: "une erreur est survenue pendant le payement ",
                     icon: "error",
                     confirmButtonText: "Oui",
                   });
            } else {
              resetform();
            
              setTimeout(3000)
                 Swal.fire({
                   title: "Erreur",
                   text: "une erreur est survenue pendant le payement, veuillez verifier votre solde ",
                   icon: "error",
                   confirmButtonText: "Oui",
                 });
                 stopLoading()
            } 
          }else{
            
            Swal.fire({
              title: "Erreur",
              text: "veuillez verifier les données que vous avez saisi",
              icon: "error",
              confirmButtonText: "Oui",
            });
            stopLoading();
  
          } 
          
      stopLoading();
  
        } 
        else{
          Swal.fire({
            title: "Erreur",
            text: "veuillez remplir les données que vous avez saisi",
            icon: "error",
            confirmButtonText: "Oui",
          });
        }
     
    };
  return (
 
    <Card
      variant="outlined"
      sx={{
        maxHeight: '20%',
        maxWidth: '30%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        
        bgcolor: 'transparent',
        zIndex: 2,
        top: '-350px',
        right:'400px',
        // borderRadius: '10PX',
        borderColor:'transparent'
        
      
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
 
 onChange={handlepays}
      placeholder="Pays"
      indicator={<KeyboardArrowDown />}
      sx={{
        width: 180,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
      }}
   
    >
      <Option value="Madagascar" >Madagascar</Option>
     
    </Select>
     
      
    <Select
      placeholder="Ville"
      indicator={<KeyboardArrowDown />}
      sx={{
        width:180,
        [`& .${selectClasses.indicator}`]: {
          transition: '0.2s',
          [`&.${selectClasses.expanded}`]: {
            transform: 'rotate(-180deg)',
          },
        },
        left:'18px'
      
      }}
      name='ville'
    
     onChange={handlevile}
    >
      {villes.map((ville, index)=>(
      <Option key= {index} value={ville} >{ville}</Option>
      ))}
    </Select>
     
         <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Adress </FormLabel>
          <Input  placeholder="Lot VH 15A" endDecorator={< HiOutlineLocationMarker size={20}  />} value={adress} onChange={adresschange} />
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
          <Radio id={value} onChange={payementchange} value={value} checkedIcon={<CheckCircleRoundedIcon />} />
          
          <FormLabel htmlFor={value}>{value}</FormLabel>
        </Sheet>
      ))}
    </RadioGroup>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Numéros de carte crédit</FormLabel>
          <InputMask
                mask="9999 9999 9999 9999"
                value={account_number}
                onChange={numcomptechange}
                disabled={false}
                maskChar=" "
            >
                {() => (
                    <Input
                        endDecorator={<CreditCardIcon />}
                        placeholder="#### #### #### ####"
                    />
                )}
            </InputMask>
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
          <InputMask
                mask="9999"

                disabled={false}
                maskChar=" "
            >
                {() => (
          <Input endDecorator={<InfoOutlined/>} placeholder='1234' />
          )}
          </InputMask>
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Nom du propietraire</FormLabel>
          <Input placeholder="Nom et prénom" />
        </FormControl>
      
      
        
       
        <CardActions sx={{ gridColumn: '1/-1' }}>
          <Button variant="solid"  sx={{borderRadius: '10px'}} onClick={paymentsubmit}>
          {
              loading ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: "#FFFFFF",
                  }}
                >
                  <CircularProgress
                    sx={{
                      color: "white",
                    }}
                  />
                </Box>
              ) : (
              "Effectuer le payement"
              )
            } 
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}
