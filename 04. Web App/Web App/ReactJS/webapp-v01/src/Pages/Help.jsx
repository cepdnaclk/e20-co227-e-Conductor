import React from 'react';
import { Box, Card, CardContent, Grid } from '@mui/material';
import Texts from '../Components/InputItems/Texts';

export default function Help() {
  const tutorials = [
    {
      title: 'How to Get Started',
      description: 'Learn how to create an account and navigate through the main features of our app.',
      videoId: 'BHEPVdfBAqE?si=YYU4eJ1Gc7xU6jIh' 
    },{
      title: 'How to Book a Ticket',
      description: 'Step-by-step guide to booking a bus ticket using our platform.',
      videoId: 'gsa2d8mLxB0?si=IStCRvKKJ08HSzw8'
    },{
      title: 'Managing Your Bookings',
      description: 'Find out how to view, track, or cancel your bookings.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Reloading Your Digital Vollet',
      description: 'Find out how to reload your digital vollet through our platform.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Prevent Unauthorized Access',
      description: 'Find out how to check your last sessions and prevent unauthorized accesses.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Managing Your Bus Schedules',
      description: 'Find out how to manage your allocated schedules through our platform.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Monitor Your Buses Live Location',
      description: 'Find out how to find your own buses live location.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Scan And Pay',
      description: 'Find out how to use scan and pay (quick payment feature) in our platform instead of actual money.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Monitor Your Income',
      description: 'Find out how to monitor your daily, weekly, monthly, and anual income using our platform easily.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },{
      title: 'Edit Your Personal Details',
      description: 'Find out how to edit your personal details and change account type easily.',
      videoId: 'r42jcDXSFM0?si=OKkYMaijHU3yPapg' 
    },
    // Add more tutorials as needed
  ];

  return (
    <Box bgcolor={'ghostwhite'} p={3}>
      <Texts variant="h4" textAlign="center" mb={6}>
        Help & Tutorials
      </Texts>

      <Grid container spacing={3} mb={6} justifyContent={'space-around'}>
        {tutorials.map((tutorial, index) => (
          <Grid item key={index} xs={12} md={6} xl={4} display={'flex'} justifyContent={'space-around'}>
            <Card elevation={3} sx={{height:'100%', width:'100%', maxWidth:'500px', borderRadius:'17px', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', p:2, textAlign:'center'}}>
              <CardContent sx={{width:'100%', height:'100%', gap:2, p:0, m:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:'space-between'}}>
                <Texts whiteSpace='normal' variant="h6">
                  {tutorial.title}
                </Texts>
                <Texts whiteSpace='normal' fontColor='textSecondary' variant="body2">
                  {tutorial.description}
                </Texts>
                <Box
                  width={'100%'}
                  component="iframe"
                  src={`https://www.youtube.com/embed/${tutorial.videoId}`}
                  sx={{ width: '100%', height: '315px', border: 0 }}
                  allowFullScreen
                  title={tutorial.title}
                />
              </CardContent> 
            </Card>
          </Grid>
        ))}
      </Grid>       
    </Box>
  );
}
