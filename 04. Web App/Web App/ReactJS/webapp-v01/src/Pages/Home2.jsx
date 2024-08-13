import { Box, Button, Card, Grid, Typography } from '@mui/material';
import React from 'react';
import bgImage from '../Images/hp4.webp';
import Texts from '../Components/InputItems/Texts';

function QuickCards(){
  return(
    <Card sx={{width:'340px', height:'340px'}}>

    </Card>
  );
}



export default function Home({ language }) {
  return (
    <Box width={'100%'} height={'fit-content'} display={'flex'} flexDirection={'column'} alignItems={'center'}>
      {/* Landing Section */}
      <Box width={'100%'} 
        sx={{
          height:'calc(100vh - 100px)',
          backgroundImage: `url(${bgImage})`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'bottom',
          backgroundSize: 'cover',
          display:'flex',
          justifyContent:'start' ,
          alignItems:'center',
          padding:'5%',
          '@media (max-width: 600px)': {
            height: 'auto', 
            aspectRatio: '16/9',
            backgroundSize: 'contain', 
            padding:'0',
            justifyContent:'center',
          },
        }}
      >
        <Box 
          sx={{
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            pr:'5%',
            '@media (max-width: 600px)': {
              padding: '10px', // Adjust padding for smaller screens
            },
          }}
        >
        <Typography 
          variant='h1' 
          fontWeight={'bold'}
          color={'black'}
          sx={{
            fontSize: '2rem', // Default font size
            '@media (min-width: 600px)': {
              fontSize: '3rem', // Adjust font size for larger screens
            },
            '@media (min-width: 960px)': {
              fontSize: '4rem', // Adjust font size for even larger screens
            },
          }}
        >
          Welcome to e-conductor
        </Typography>  

        <Typography 
          variant='body2'
          fontWeight={'bold'} 
          color={'textSecondary'}
          sx={{
            fontSize: '1rem', // Default font size
            '@media (min-width: 600px)': {
              fontSize: '1.7rem', // Adjust font size for larger screens
            },
          }}
        >
          Future of the Sri Lankan transport
        </Typography>  

        <Button 
          variant='contained' 
          sx={{
            width:{xs:'156px', md:'200px'}, 
            height:{xs:'35px', md:'50px'}, 
            fontSize:{xs:'14px', md:'18px'}, 
            mt:'10px'
          }}
        >
          Buy Your Ticket
        </Button>     
      </Box>
      </Box>

      {/* Why with us - Quick Links */}
      <Box width={'calc(100% - 40px)'} height={'calc(100vh - 100px)'} bgcolor={'lightblue'} padding={2}>
        <Typography 
          fontWeight={'bold'}
          fontFamily={'Open Sans'}
          color={'black'}
          sx={{
            fontSize: '2rem', // Default font size
            '@media (min-width: 600px)': {
              fontSize: '2.5rem', // Adjust font size for larger screens
            },
            '@media (min-width: 960px)': {
              fontSize: '3rem', // Adjust font size for even larger screens
            },
          }}
        >
          Why e-conductor
        </Typography>

        <Grid container spacing={2} mt={2}>
          <Grid item xs={12} md={6} lg={4} bgcolor={'red'}>
            <QuickCards/>
          </Grid>
        </Grid>
      </Box>

      {/* Reviews */}
      <Box width={'100%'} height={'calc(100vh - 100px)'} bgcolor={'ghostwhite'}>
        
      </Box>

      {/* FAQ */}
      <Box width={'100%'} height={'calc(100vh - 100px)'} bgcolor={'gray'}>
        
      </Box>
    </Box>
  );
}
