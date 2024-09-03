import { Box, Button, Card, Grid, InputAdornment, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Texts from '../Components/InputItems/Texts'
import { useNavigate } from 'react-router-dom';
import GooglePayButton from '@google-pay/button-react';
import { ToastAlert } from '../Components/MyNotifications/WindowAlerts';
import { Request } from '../APIs/NodeBackend';

const MIN_AMOUNT = 1;     // LKR
const MAX_AMOUNT = 10000; // LKR

function GooglePay({amount, transID, setLoading}) {
  const navigate = useNavigate();

  // Function to send data to the backend
  const sendReload = async(values) => {
    const data = {
      type: 'Trans4',
      data: values
    }
    try {
      setLoading(true);  // Enabling spinner
      console.log(`New request:: type:${data.type} data:${JSON.stringify(data.data)}`);
      const serverResponse = await Request(data, 'transactions');
      console.log(`Update account balance: ${serverResponse.data}`);
      setLoading(false);  // Disabling spinner
      if (serverResponse.data === 'success'){
        console.log('Paymet Successfull! Your account balance is updated!');
        ToastAlert({
          type: 'success',
          title: 'Payment Successfull!',
          onClose: refresh
        });
      }
    } catch (error) {
      console.log(`Error in sending data!`);
    }
  }

  // Function to Refresh page
  const refresh = () => {
    setTimeout(() => {
      navigate(0);
    }, 3001);
  }

  return(
    <GooglePayButton
      environment='TEST'     
      buttonRadius={20}
      buttonSizeMode='fill' 
      buttonType='pay'
      paymentRequest={{
        apiVersion: 2,
        apiVersionMinor: 0,
        allowedPaymentMethods:[
          {
            type: 'CARD',
            parameters:{
              allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
              allowedCardNetworks:['MASTERCARD', 'VISA'],
            },
            tokenizationSpecification:{
              type:'PAYMENT_GATEWAY',
              parameters:{
                gateway: 'example',
                gatewayMerchantId: 'exampleGatewayMerchantId',
              },
            },
          },
        ],
        merchantInfo: {
          merchantId:'1234568790123456890',
          merchantName:'Demo Merchant',                
        },
        transactionInfo:{
          totalPriceStatus:'FINAL',
          totalPriceLabel: 'Total',
          totalPrice:parseFloat(amount).toFixed(2),
          currencyCode:'LKR',
          countryCode:'LK',
          transactionId:transID,
          transactionNote:'Econductor_Payment'
        },
        callbackIntents: ["PAYMENT_AUTHORIZATION"],
      }}
            
      onCancel={()=>{
        console.log('Cancel Payment');
        ToastAlert({
          type: 'warning',
          title: 'Payment cannot be continued!',
          onClose: refresh
        });
      }}
      onError={()=>{
        console.log('Error in payment');
        ToastAlert({
          type: 'error',
          title: 'Payment Failed!',
          onClose: refresh
        });
      }}

      onLoadPaymentData={()=>{
        console.log('Payment Loaded Successfully!');
      }}
      onPaymentAuthorized={()=>{
        console.log('Payment Autherized Successfully!');
        sendReload();
        return {transactionState: 'SUCCESS'}
      }}
    />
  )
}

function QuickCard({value, handleClick}){
  return(
    <Button 
      variant='contained' 
      onClick={()=>handleClick(value)}
      sx={{
        display:'flex', 
        flexDirection:'column', 
        bgcolor:'#404040', 
        width:'80px',
        ":hover":{
          bgcolor:'black'
        }
      }}>
      <Texts fontColor='white' variant={"caption"}>LKR<br/></Texts>
      <Texts fontColor='white' variant={'h6'}>{value}</Texts>
    </Button>
  )
}

export default function Reload({language, setLoading}) {
  // Variable to store userID
  const userID = JSON.parse(localStorage.getItem('userId')) || JSON.parse(sessionStorage.getItem('userId'));

  // Variable to hold reload amount
  const [amount, setAmount] = useState(1);

  // Variable to hold transaction Id
  const [transID, setTransID] = useState('');

  // Function to handle text field
  const handleChange = (e) => {
    let num = e.target.value;

    if (num < MIN_AMOUNT) num = MIN_AMOUNT;
    else if (num > MAX_AMOUNT) num = MAX_AMOUNT;
    else num = parseInt(num);

    setAmount(num);
    console.log('amount: ', num);
  }

  // Function to handle quick buttons
  const handleClick = (value) => {
    console.log("amount: ", value);
    setAmount(value);
  }

  // Request transaction Id
  useEffect(()=>{
    const requestID = async() => {
      const data = {
        type:'Trans3', // Requesting next transaction ID
        data: userID
      }

      try {
        setLoading(true);  // Enabling spinner
        console.log(`Requesting Transaction ID from backend.`);
        const serverResponse = await Request(data, 'transactions');
        const transactionId = serverResponse.data;
        console.log(`New transaction id: ${transactionId}`);

        if(!!transactionId){
          setTransID(transactionId);
        }
        else{
          console.log('Somthing went wrong!');
        }
      } catch (error) {
        console.log(`Error in fetching transId`);
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    requestID();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  return (
    <Box width={'100%'} height={'fit-content'} bgcolor={'ghostwhite'} padding={"20px"} justifyContent={'center'} display={"flex"} alignItems={'center'}>
      <Card sx={{width:'350px', height:'fit-content', display:'flex', flexDirection:'column', alignItems:'center', gap:"10px", padding:'20px', margin:"50px"}}>
        <Texts variant='h5'>Reload</Texts>
        
        <Box sx={{display:'flex', flexDirection:'column', alignItems:"center", width:'calc(100% - 40px)'}}>
          <Texts variant='caption' fontColor='textSecondary'>Please enter the amount here.</Texts>
          <TextField
            fullWidth
            value={amount}
            onChange={handleChange}
            type="number"
            InputProps={{
              startAdornment: <InputAdornment position="start"><Texts>LKR</Texts></InputAdornment>,
              inputProps: {
                style: {
                  // Ensure text field appearance is consistent
                  appearance: 'textfield',
                  MozAppearance: 'textfield',
                }
              },
            }}
            sx={{
              margin: '10px 0',
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'black' }, // Default border color
                '&:hover fieldset': { borderColor: 'black' }, // Border color on hover
                '&.Mui-focused fieldset': { borderColor: 'black' }, // Border color when focused
              },
              '& .MuiInputAdornment-root': {
                color: 'black', // Color of the adornment (LKR)
              },
              '& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button': {
                // Hide spin buttons in WebKit browsers
                WebkitAppearance: 'none',
                margin: 0,
              },
              '& input[type=number]': {
                // Hide spin buttons in Firefox
                MozAppearance: 'textfield',
              }
            }}
          />
        </Box>
        
        <Grid container height={'fit-content'} width={'calc(100% - 40px)'} display={"flex"} justifyContent={"space-between"}>
          <Grid item> 
            <QuickCard value={100} handleClick={handleClick}/>
          </Grid>
          <Grid item>
            <QuickCard value={500} handleClick={handleClick}/>
          </Grid>
          <Grid item>
            <QuickCard value={1000} handleClick={handleClick}/>
          </Grid>
        </Grid>

        <Box mt={'10px'} width={'calc(100% - 40px)'} display={'flex'} justifyContent={"center"} alignItems={"center"} flexDirection={'column'}>
          <GooglePay amount={amount} transID={transID} setLoading={setLoading}/>
        </Box>
      </Card>
    </Box>
  )
}
