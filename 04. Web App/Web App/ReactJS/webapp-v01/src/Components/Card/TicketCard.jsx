import { Box, Card, Grid, IconButton } from '@mui/material'
import React from 'react'
import Texts from '../InputItems/Texts'
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MapIcon from '@mui/icons-material/Map';
import { useNavigate } from 'react-router-dom';

export default function TicketCard({data, handleCancel}) {
  const navigate = useNavigate();

  // Availability of tracking
  const tracking = data.tracking;

  // Avaailability of refunding
  const cancel = data.cancel;

  // Handling view button
  const handleView = (refNo) => {
    console.log(`View button is clicked ${refNo}`);   
    sessionStorage.setItem('TicketNo', JSON.stringify(refNo));
    navigate('/invoice');
  }

  // Handling tracking button
  const handleTrack = (refNo) => {
    console.log(`Tracking button is clicked ${refNo}`);    
    sessionStorage.setItem('TicketNo', JSON.stringify(refNo));
    navigate('/tracking');
  }
  
  return (
    <Card sx={{width:'390px', height:'250px', borderRadius:'10px', boxShadow:'150px'}} >
        <Box bgcolor={tracking ? '#00cc66' : '#ff9900'} width={"100%"} height={'40px'} display={'flex'} padding='0 10px' alignItems={'center'} justifyContent={'space-between'} borderRadius={'10px 10px 0 0'} >
            <Texts fontColor='white'> Ref No: {data.refNo} </Texts>
            <Texts fontColor='white'> {data.date} / {data.departure} </Texts>
        </Box>

        <Grid container spacing={1} justifyContent={'space-between'} padding={'5px 8px'}>
            <Grid item width={'170px'} >
                <Box display={'flex'} flexDirection={'column'}>
                    <Texts variant='body2' fontSize='12px'>Origin</Texts>
                    <Texts variant='h5'>{data.fromT}</Texts>
                    <Texts variant='h6'>{data.from}</Texts>
                </Box>
            </Grid>
            <Grid item width={'170px'} >
                <Box display={'flex'} flexDirection={'column'}>
                    <Texts variant='body2' fontSize='12px'>Destination</Texts>
                    <Texts variant='h5'>{data.toT}</Texts>
                    <Texts variant='h6'>{data.to}</Texts>
                </Box>
            </Grid>
            <Grid item width={'40px'} >
                <Box display={'flex'} flexDirection={'column'} height={'100%'} justifyContent={'space-between'} >
                    <IconButton onClick={()=>handleView(data.refNo)} >
                        <VisibilityIcon sx={{color:'black', opacity:'30%'}}/>
                    </IconButton>
                    {tracking &&
                        <IconButton onClick={()=>handleTrack(data.refNo)}>
                            <MapIcon sx={{color:'black', opacity:'30%'}}/>
                        </IconButton>
                    }
                    {cancel && 
                        <IconButton onClick={()=>handleCancel(data.refNo)}>
                            <DeleteForeverOutlinedIcon sx={{color:'black', opacity:'30%'}}/>
                        </IconButton>
                    }                    
                </Box>
            </Grid>
        </Grid>
        
        <Box padding={'0 10px'}>
            <Texts variant="caption" fontColor="textSecondary">{data.regNo} | {data.org} | {data.service} | {data.route}</Texts>
        </Box>

        <Box padding={'5px 10px'} display={'flex'} justifyContent={'space-between'}>
            <Texts variant="body2" >Price: LKR {data.price} </Texts>
            <Texts variant="body2" >Adult: {data.full} | Child: {data.half} </Texts>
        </Box>

        <Box padding={'0px 10px'} display={'flex'} justifyContent={'space-between'}>
            <Texts variant="body2" >Seat No(s): {data.seats} </Texts>
        </Box>

        {tracking ? 
            <Box padding={'0 10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} mt={1}>
                <InfoOutlinedIcon sx={{fontSize:'15px', color:'#00cc00', mr:'5px'}}/>
                <Texts variant="caption" fontColor="#00cc00"> Tracking is available! </Texts>
            </Box> 
            : 
            <Box padding={'0 10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} mt={1}>
                <InfoOutlinedIcon sx={{fontSize:'15px', color:'#ff9900', mr:'5px'}}/>
                <Texts variant="caption" fontColor="#ff9900"> Tracking is available 5 min before the bus departure. </Texts>
            </Box>
        }        
    </Card>
  )
}
