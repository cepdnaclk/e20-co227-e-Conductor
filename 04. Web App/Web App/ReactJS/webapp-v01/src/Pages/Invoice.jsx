import React, {useRef} from 'react'
import Invoice from '../Components/Invoice/Invioce';
import ReactToPrint from 'react-to-print';
import { AppBar, Badge, Box, Grid, IconButton, Toolbar } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

 
export default function InvoicePage({language}) {
  // Print hook
  const componentRef = useRef();

  // Paper size
  const A4_WIDTH  = (210 * 3.7795275591); // in cm -> px
  const A4_HEIGHT = (297 * 3.7795275591); // in cm -> px

  // Ticket Number
  const ticketNo = (localStorage.getItem('TicketNo') || null);

  // Dummy data for ticket
  const data = {
    ticketNo       : ticketNo,
    customerName   : 'John\u00a0Doe',
    customerEmail  : 'Johndoe@gmail.com',
    customerMobile : '+94\u00a070-1523456',
    issuedDate     : '2024-05-01',
    issuedTime     : '15:06:49',
    vehicalNo      : 'NC-1550',
    type           : 'Normal' ,
    routeNo        : '602',
    route          : 'Kandy-Kurunegala',
    date           : '2024-05-05',
    time           : '15:30',
    from           : 'Kurunegala',
    to             : 'Kandy',
    journey        : '43.00',
    price          : '195.00',
    full           : 2,
    half           : 1,
    seatNos        : '12, 15, 54'
  }
 
  return (
    ticketNo === null ? (<div>404 Page Not Found</div>) : (
      <Box sx={{ flexGrow: 1 }}>
        <ReactToPrint
          trigger={()=>(            
            <AppBar position="sticky" sx={{bgcolor:"black", opacity:'80%'}}>
              <Toolbar sx={{display:'flex', justifyContent:'end'}}>
                <IconButton
                  size="large"
                  color="inherit"
                  sx={{"&:hover":{bgcolor:'rgb(204,204,204,0.2)'}}}
                >
                  <Badge>
                    <PrintIcon />
                  </Badge>
                </IconButton>
              </Toolbar>
            </AppBar>
          )}
          content={()=>componentRef.current}
        />
        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            height: 'fitcontent',
            background: '#595959',
            padding: '20px',
            overflow: 'auto',
            minHeight: `${A4_HEIGHT}px`,
            minWidth: `${A4_WIDTH}px`,
          }}>
            <div 
              ref={componentRef} 
              style={{
                width:`${A4_WIDTH}px`, 
                minWidth:`${A4_WIDTH}px`, 
                maxWidth:`${A4_WIDTH}px`, 
                height:`${A4_HEIGHT}px`, 
                minHeight:`${A4_HEIGHT}px`, 
                maxHeight:`${A4_HEIGHT}px`, 
                margin:'0', 
                padding:'0', 
              }}>
              <Invoice data={data}/>
            </div>
        </Grid>
      </Box>
    )
  )
}
