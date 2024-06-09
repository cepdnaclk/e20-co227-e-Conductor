import { Box, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, styled } from '@mui/material';
import React from 'react'
import logo from '../../Images/logo - no bkgnd.png';
import Divider from '@mui/material/Divider';
import Figure from 'react-bootstrap/Figure';

// Paper size
const A4_WIDTH  = (210 * 3.7795275591); // in cm -> px
const A4_HEIGHT = (297 * 3.7795275591); // in cm -> px
const MARGINE_V = (0.75 * 96);          // in inch -> px
const MARGINE_H = (0.75 * 96);          // in inch -> px
 
export default function Invoice({data, language}) { 
  // Styling for boxes
  const Item = styled(Box)(({ theme }) => ({
    backgroundColor:'transparent',
    border: '2px solid #bfbfbf',
    borderRadius:'10px',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
  }));

  const Topic = styled(Box)(({ theme }) => ({
    backgroundColor:'transparent',
    border: 'none',
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  }));
  

  return (
      <Grid 
        component={Paper} 
        sx={{
          backgroundColor: 'white',
          display: 'flex',
          flexDirection: 'column',
          width: `${A4_WIDTH}px`,
          height: `${A4_HEIGHT}px`,
          padding: `${MARGINE_V}px ${MARGINE_H}px`
        }}
      >
        {/* Header */}
        <Grid 
          component='container'
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            justifyContent:'space-between',
            alignItems: 'top',
            mb: '5px'
          }}
        > 
          <Figure style={{margin:0, padding:0}}>
            <Figure.Image width={100} height={80} src={logo}/>
          </Figure>

          <Typography variant='h2' fontFamily='Open Sans' fontWeight={700}> INVOICE </Typography>
        </Grid>

        <Divider sx={{border:'none', borderTop:'3px solid black', margin:'5px 0'}}/>

        {/* Body */}
        <Grid
          sx={{
            width: '100%',
            height: 'auto',
            pt:'20px',
          }}
        >
          <Grid sx={{display: 'flex', justifyContent:'space-between', pb:'20px'}}>
            <Grid>
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize={19}>Invoice To:</Typography>
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize={20}>{data.customerName}</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>{data.customerMobile}</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>{data.customerEmail}</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>Issued On: {data.issuedDate} {data.issuedTime}</Typography>
            </Grid>
          
            <Grid>
            <Typography fontFamily='Open Sans' fontWeight='bold' fontSize={16}>e-Conductor&nbsp;(PVT)&nbsp;LTD.</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>Faculty&nbsp;of&nbsp;Engineering,<br/>University&nbsp;of&nbsp;Peradeniya,<br/>Prof.&nbsp;E.O.E.&nbsp;Pereira&nbsp;Mawatha,<br/>Kandy,<br/>Sri&nbsp;Lanka</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>+94&nbsp;78-4938615</Typography>
            <Typography fontFamily='Open Sans' fontWeight='normal' fontSize={13}>econductorinfo@gmail.com</Typography>
            </Grid>
          </Grid>

          <Grid sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
            <Typography sx={{ fontFamily: 'Open Sans', fontWeight: 'bold', fontSize: '16px', paddingBottom: '10px' }}>
              SUMMERY&nbsp;OF&nbsp;INVOICE
            </Typography>
            <Divider sx={{ flexGrow: 1, border: 'none', borderTop: '3px solid black', marginLeft: '10px', opacity:'80%'}} />
          </Grid>
          <Grid>
            <Box sx={{ flexGrow: 1, display:'flex', justifyContent:'space-between', mb:1}}>
              <Grid container spacing={1}>
                <Grid item xs={5}>
                  <Topic>Reference&nbsp;No:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.ticketNo}</Item>
                </Grid>

                <Grid item xs={5}>
                  <Topic>Valid&nbsp;On:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{`${data.date} ${data.time}`}</Item>
                </Grid>

                <Grid item xs={5}>
                  <Topic>Ride:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.from} to {data.to}</Item>
                </Grid>

                <Grid item xs={5}>
                  <Topic>Journey:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.journey} km</Item>
                </Grid>
              </Grid>

              <Grid container spacing={1} mr='10px' display='flex' justifyContent='flex-end'>
                <Grid item xs={4}>
                  <Topic>Route:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.routeNo} {data.route}</Item>
                </Grid>

                <Grid item xs={4}>
                  <Topic>Vehical&nbsp;No:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.vehicalNo}</Item>
                </Grid>
                
                <Grid item xs={4}>
                  <Topic>Service&nbsp;Type:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>{data.type}</Item>
                </Grid>

                <Grid item xs={4}>
                  <Topic>Total&nbsp;Price:</Topic>
                </Grid>
                <Grid item xs={7}>
                  <Item>LKR&nbsp;{((parseFloat(data.price) * parseInt(data.full))+(0.5 * parseFloat(data.price) * parseInt(data.half))).toFixed(2)}</Item>
                </Grid>
              </Grid>
            </Box>

            <Box sx={{ display:'flex', mb:'20px', pr:'10px', gap:'35px' }}>
              <Grid item xs={2}>
                <Topic>Seat&nbsp;No:</Topic>
              </Grid>
              <Grid item xs={10}>
                <Item sx={{flexGrow:1, textAlign: 'left', pl:'15px'}}>{data.seatNos}</Item>
              </Grid>
            </Box>
          </Grid>       

          <Grid sx={{ display: 'flex', alignItems: 'center', width: '100%'}}>
            <Typography sx={{ fontFamily: 'Open Sans', fontWeight: 'bold', fontSize: '16px', paddingBottom: '10px' }}>
              DETAILS&nbsp;OF&nbsp;CHARGERS
            </Typography>
            <Divider sx={{ flexGrow: 1, border: 'none', borderTop: '3px solid black', marginLeft: '10px', opacity:'80%'}} />
          </Grid> 
          <TableContainer component={Paper} sx={{mb:'20px'}}> 
            <Table size='small'>
              <TableHead sx={{backgroundColor:'#cccccc'}}>
                <TableRow>
                  <TableCell align='left'   sx={{fontFamily: 'Open Sans', fontWeight:'bold', fontSize:'14px'}}>Passenger&nbsp;Type</TableCell>
                  <TableCell align='center' sx={{fontFamily: 'Open Sans', fontWeight:'bold', fontSize:'14px'}}>Passengers</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontWeight:'bold', fontSize:'14px'}}>Price&nbsp;(LKR)</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontWeight:'bold', fontSize:'14px'}}>Total&nbsp;(LKR)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align='left'   sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>Adult</TableCell>
                  <TableCell align='center' sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{data.full}</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{data.price}</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{(parseFloat(data.price) * parseInt(data.full)).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='leftt'  sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>Childern</TableCell>
                  <TableCell align='center' sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{data.half}</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{data.price}</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans', fontSize:'14px'}}>{(0.5 * parseFloat(data.price) * parseInt(data.half)).toFixed(2)}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align='leftt' colSpan={3}  sx={{fontFamily: 'Open Sans', fontWeight:'bold', fontSize:'14px'}}>SUBTOTAL</TableCell>
                  <TableCell align='right'  sx={{fontFamily: 'Open Sans',fontWeight:'bold', fontSize:'14px'}}>{((parseFloat(data.price) * parseInt(data.full))+(0.5 * parseFloat(data.price) * parseInt(data.half))).toFixed(2)}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>

        <Divider sx={{border:'none', borderTop:'3px solid black', margin:'5px 0'}}/>

        {/* Footer */}
        <Grid
          sx={{
            width: '100%',
            height: '20%',
          }}
        >
          <Typography sx={{mt:'5px', fontFamily:'Open Sans', fontWeight:'bold', fontSize:'14px', color:'#666666'}}>Terms&nbsp;and&nbsp;conditions</Typography>
          <Typography textAlign='justify' sx={{mt:'5px', fontFamily:'Open Sans', fontSize:'12px', color:'#4d4d4d'}}><p>
            {`Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, 
            making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more 
            obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered 
            the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) 
            by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, 
            "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`}</p>
          </Typography>
        </Grid>
      </Grid>
  )
}
