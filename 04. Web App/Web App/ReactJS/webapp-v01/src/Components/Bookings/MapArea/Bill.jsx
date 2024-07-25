import React from 'react'
import { Box, Divider, Grid, Paper } from '@mui/material'
import Texts, { StyledTextField } from '../../InputItems/Texts'

export default function Bill({bookingData}) {
  const {service, org, routeType, regNo} = JSON.parse(sessionStorage.getItem('bus'));

  return (
    <Paper sx={{width:'calc(100% - 20px)', height:'70vh', minHeight:'400px', gap:'20px', margin:'10px 0'}}>
        <Box width={'100%'} height={'100%'} p={2} overflow='auto'>     
            <Grid >
                <Grid container mb={3}>
                    <Texts variant={'h5'}>Billing Infomation</Texts>
                </Grid>

                <Grid>
                    <Texts variant={'h6'}>Customer Details</Texts>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} lg={4}>
                            <StyledTextField 
                                label={'Name'}
                                value={bookingData.name}
                                readOnly
                            />
                        </Grid>

                        <Grid item xs={6} lg={4}>
                            <StyledTextField 
                                label={'Mobile'}
                                value={`+${bookingData.mobile}`}
                                readOnly
                            />
                        </Grid>

                        <Grid item xs={6} lg={4} >
                            <StyledTextField 
                                label={'Email'}
                                value={bookingData.email}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>

                <Grid>
                    <Texts variant={'h6'}>Ticket Details</Texts>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={6} lg={3}>
                            <StyledTextField 
                                label={'From'}
                                value={`${bookingData.from} (${bookingData.aproxAriT})`}
                                readOnly
                            />
                        </Grid>

                        <Grid item xs={6} lg={3}>
                            <StyledTextField 
                                label={'To'}
                                value={`${bookingData.to} (${bookingData.aproxDepT})`}
                                readOnly
                            />
                        </Grid>

                        <Grid item xs={6} lg={3}>
                            <StyledTextField 
                                label={'Date'}
                                value={bookingData.date}
                                readOnly
                            />
                        </Grid>

                        <Grid item xs={6} lg={3} >
                            <StyledTextField 
                                label={'Seats'}
                                value={bookingData.seatNos}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>

                <Grid>
                    <Texts variant={'h6'}>Vehicle Details</Texts>
                    <Grid container spacing={2} mb={2}>
                        <Grid item xs={12} lg={4}>
                            <StyledTextField 
                                label={'Service Type'}
                                value={`${service} - ${org}`}
                                readOnly
                            />
                        </Grid>
                        
                        <Grid item  xs={6} lg={4}>
                            <StyledTextField 
                                label={'Route Type'}
                                value={routeType}
                                readOnly
                            />
                        </Grid>
                        
                        <Grid item xs={6} lg={4}>
                            <StyledTextField 
                                label={'Vehicle Number'}
                                value={regNo}
                                readOnly
                            />
                        </Grid>
                    </Grid>
                    <Divider/>
                </Grid>
            </Grid>
        </Box>
    </Paper>
  )
}
