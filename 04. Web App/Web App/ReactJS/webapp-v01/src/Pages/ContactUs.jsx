import React, { useState } from 'react';
import { Box, Button, Card, Grid, Link, TextField } from '@mui/material';
import Texts from '../Components/InputItems/Texts';
import { Email, WhatsApp, Facebook, Instagram, LinkedIn, X } from '@mui/icons-material';
import SendIcon from '@mui/icons-material/Send';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import { GetRequest } from '../APIs/NodeBackend';
import { ToastAlert } from '../Components/MyNotifications/WindowAlerts';
import { useNavigate } from 'react-router-dom';
import { OnceZoomIn } from '../Components/Animations/Entrance.Once';

function ContactForm({ onSubmit }) {
    const maxCount = 250;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    // Variable to hold form data
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    // Variable to hold the errors
    const [error, setError] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let err = {};

        // Error handling
        if(!formData.name){
            err.name = "* This is an invalid name!"; 
        };

        if(!formData.email || !regex.test(formData.email)){
            err.email = "* This is an invalid email format!"; 
        };

        if(!formData.message){
            err.message = "* This field is required!"; 
        }

        if (Object.keys(err).length > 0) {
            setError(err);
        } else {
            setError({});
            onSubmit(formData);
        }
    };

    return (
      <Card elevation={3} sx={{width:'100%',  p:3}}>
        <Grid container spacing={3}>
          <Grid item xs={12} lg={6}>
            <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                variant="outlined" 
                inputProps={{maxLength: 25}}
                error={!!error.name}
                helperText={error.name}
            />
          </Grid>
                    
          <Grid item xs={12} lg={6}>
            <TextField
                fullWidth
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                type="email"
                variant="outlined" 
                inputProps={{maxLength: 50}}
                error={!!error.email}
                helperText={error.email}
            />
          </Grid>
                    
          <Grid item xs={12}>
            <TextField
                fullWidth
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                multiline
                rows={5}
                variant="outlined" 
                inputProps={{maxLength: maxCount}}
                error={!!error.message}
                helperText={error.message}
            />
            <Texts fontSize={'13px'} fontWeight='normal' textAlign='right' fontColor='textSecondary'>{formData.message.length}/{maxCount} characters</Texts>
          </Grid>
                    
          <Grid item xs={12} textAlign="center">
            <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ padding: '10px 30px', fontSize: '16px' }}
                onClick={handleSubmit}
                endIcon={<SendIcon/>}
            >
                Send Message
            </Button>
          </Grid>
        </Grid>
      </Card>
    );
}

const ContactUs = ({setLoading, language}) => {
  const navigate = useNavigate();

  const handleFormSubmit = async(data) => {
    console.log('Form Data Submitted:', data);
    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await GetRequest(data, 'feedback/message');
      console.log('Form submitted: ', serverResponse.data);
      setLoading(false);  // Disabling spinner
      if (serverResponse.data === 'success'){
        ToastAlert({
          type: 'success',
          title: 'Message send successfully!',
          onClose: refresh
        });
      } else {
        ToastAlert({
          type: 'error',
          title: 'Message sending failed. Please try again in a few seconds!',
          onClose: refresh
        });
      }
    } catch (error) {
        console.log('Error in submitting message');
    }
  };

  // Refresh page
  const refresh = (timmer=3000) => {
    setTimeout(() => {
      navigate(0);
    }, timmer+1);
  };

  return (
    <Box bgcolor={'ghostwhite'} p={'40px 6%'}>
      <Texts variant="h3" textAlign="center" gutterBottom whiteSpace='normal'>
        Contact Us
      </Texts>
      <Texts variant="body1" textAlign="center" paragraph whiteSpace='normal'>
        We'd love to hear from you! Please fill out the form below or reach out through any of our contact methods.
      </Texts>

      <Grid container spacing={5} justifyContent="center" mt={0}>
        <Grid item xs={12} md={7}>
          <OnceZoomIn sx={{width:'100%', height:'100%'}}>
            <ContactForm onSubmit={handleFormSubmit} />
          </OnceZoomIn>
        </Grid>

        <Grid item xs={12} md={5}>
          <OnceZoomIn delay={100} sx={{width:'100%', height:'100%'}}>
            <Card elevation={3} sx={{width:'100%', height:'100%', p:3}}>
              <Texts variant="h5" gutterBottom mb={2} whiteSpace='normal'>
                Other Ways to Reach Us
              </Texts>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} height={'calc(100% - 30px)'}>
                <Link href="tel:+94784938615" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <SupportAgentIcon sx={{ fontSize: 30, color: 'black', marginRight: '10px' }} />
                    24x7 Hotline: <span style={{whiteSpace:'noWrap'}}>+94 78-4938615</span>
                  </Texts>
                </Link>

                <Link href="https://wa.me/+94784938615" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <WhatsApp sx={{ fontSize: 30, color: '#25D366', marginRight: '10px' }} />
                    WhatsApp: <span style={{whiteSpace:'noWrap'}}>+94 78-4938615</span>
                  </Texts>
                </Link>

                <Link href="mailto:econductorinfo@gmail.com" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <Email sx={{ fontSize: 30, color: '#df5245', marginRight: '10px' }} />
                    Email: econductorinfo@gmail.com
                  </Texts>
                </Link>

                <Link href="https://www.facebook.com/econductor" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <Facebook sx={{ fontSize: 30, color: '#1877F2', marginRight: '10px' }} />
                    Facebook: facebook.com/econductor
                  </Texts>
                </Link>

                <Link href="https://www.instagram.com/econductor" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <Instagram sx={{ fontSize: 30, color: '#993e99', marginRight: '10px' }} />
                    Instagram: @econductor
                  </Texts>
                </Link>

                <Link href="https://twitter.com/econductor" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal'>
                    <X sx={{ fontSize: 30, color: '#171b20', marginRight: '10px' }} />
                    X (Twitter): @econductor
                  </Texts>
                </Link>

                <Link href="https://www.linkedin.com/in/econductor" underline="none" target="_blank">
                  <Texts fontSize={'20px'} whiteSpace='normal' fontWeight='normal' mb={1}>
                    <LinkedIn sx={{ fontSize: 30, color: '#0A66C2', marginRight: '10px' }} />
                    LinkedIn: linkedin.com/in/econductor
                  </Texts>
                </Link>
              </Box>
            </Card>
          </OnceZoomIn>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContactUs;
