import React from 'react';
import { Card, CardContent, Typography, Button, Grid } from '@mui/material';



const BusCard = ({bus , onClick}) => {
  return (
    <Card variant="outlined" sx={{ marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={8} sx={{direction:'column'}}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>            
                <Typography variant="body2" fontFamily='Open Sans' fontWeight='bold' >Departure</Typography>    
                <Typography variant="h5" fontFamily='Open Sans' fontWeight='bold' whiteSpace='nowrap'>{bus.departure}</Typography>
                <Typography variant="h6" fontFamily='Open Sans' fontWeight='bold' whiteSpace='nowrap'>{bus.from}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontFamily='Open Sans' fontWeight='bold'>Arrival</Typography>    
                <Typography variant="h5" fontFamily='Open Sans' fontWeight='bold' whiteSpace='nowrap'>{bus.arrival}</Typography>
                <Typography variant="h6" fontFamily='Open Sans' fontWeight='bold' whiteSpace='nowrap'>{bus.to}</Typography>
              </Grid>
            </Grid>          
            <Typography variant="caption" color="textSecondary">{bus.regNo} | {bus.org} | {bus.service} | {bus.routeType} | Route: {bus.routeNo}</Typography>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Grid container spacing={3}>
              <Grid item xs={6} sm={12} lg={6}>
                <Typography variant='h5' whiteSpace='nowrap' fontFamily='Open Sans' fontWeight='bold' >LKR {bus.price}</Typography>
                <Typography variant='caption' whiteSpace='nowrap'>Billing Closing Date</Typography>
                <Typography variant='body1' whiteSpace='nowrap' fontFamily='Open Sans' fontWeight='bold'>{bus.closing}</Typography>
                <Typography variant='caption' whiteSpace='nowrap'>Available Seats</Typography>
                <Typography variant='body1' fontFamily='Open Sans' fontWeight='bold'>{bus.available}</Typography>                
              </Grid>

              <Grid item xs={6} sm={12} lg={6} sx={{display:'flex', alignItems:'center'}}>
                  {bus.available > 0 ? 
                    <Button variant='contained' onClick={onClick}>Continue</Button> : 
                    <Button variant='outlined' color='error'> Sold&nbsp;Out</Button>}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default BusCard;
