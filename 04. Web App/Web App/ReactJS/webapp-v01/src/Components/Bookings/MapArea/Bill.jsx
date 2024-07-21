import React from 'react'
import { Box, Divider, Grid } from '@mui/material'
import Texts, { StyledTextField } from '../../InputItems/Texts'

const bookingData = {
    name: 'John Doe',
    mobile: '94704109990',
    email:'johndoe@gmail.com',
    from: 'Kurunegala',
    aproxAriT: '04:30',
    aproxDepT: '05:00',
    to: 'Kandy',
    date:'2024-07-20',
    regNo: 'NA-1234',
    seatNo: '25, 30, 35, 36, 37',
    service: 'Super Luxury',
    org: 'SLTB',
    routeType: 'Expressway',
}

export default function Bill() {
  return (
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
                            value={bookingData.seatNo}
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
                            value={`${bookingData.service} - ${bookingData.org}`}
                            readOnly
                        />
                    </Grid>
                    
                    <Grid item  xs={6} lg={4}>
                        <StyledTextField 
                            label={'Route Type'}
                            value={bookingData.routeType}
                            readOnly
                        />
                    </Grid>
                    
                    <Grid item xs={6} lg={4}>
                        <StyledTextField 
                            label={'Vehicle Number'}
                            value={bookingData.regNo}
                            readOnly
                        />
                    </Grid>
                </Grid>
                <Divider/>
            </Grid>
        </Grid>
    </Box>
  )
}
