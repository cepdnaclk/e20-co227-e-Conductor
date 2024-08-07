import { Box, Button, Card, Checkbox, Grid, IconButton, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, TableSortLabel, Tooltip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Rating from '@mui/material/Rating';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import FeedIcon from '@mui/icons-material/Feed';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CommuteSharpIcon from '@mui/icons-material/CommuteSharp';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';
import Texts from '../InputItems/Texts'
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../DialogBox/AlertDialog';
import FormDialog from '../DialogBox/FormDialog';
import { GetRequest } from '../../APIs/NodeBackend';
import {ToastAlert} from '../MyNotifications/WindowAlerts'

// Variable to store current date
const today = new Date().toISOString();

// Empty data form
const emptyForm = {
  userID:JSON.parse(localStorage.getItem('userId')) || JSON.parse(sessionStorage.getItem('userId')),
  regNo: '',
  ntc:'',
  org: 'Private',
  service: 'Normal',
  seats: '54',
  insuranceExp: '',
  VRL_Exp: '',
  insuranceId: '',
  VRL_Id: '',
}

// Function to create comparator componant
export function Comparator({increment}){
  if (increment > 0) {
    return (
      <Box border={'2px solid #04aa6d'} bgcolor={'#e6f7f0'} height={'30px'} borderRadius={'15px'} width={'90px'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
        <ArrowUpwardIcon sx={{color:'#04aa6d', fontSize:'20px'}}/>
        <Texts fontColor='#04aa6d'>{increment}%</Texts>
      </Box>
    )
  } else if (increment === 0) {
    return (
      <Box border={'2px solid #1976d2'} bgcolor={'#d1e4f6'} height={'30px'} borderRadius={'15px'} width={'90px'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
        <Texts fontColor='#1976d2'>Same</Texts>
      </Box>
    )
  } else {
    return (
      <Box border={'2px solid #cc3300'} bgcolor={'#ffd9cc'} height={'30px'} borderRadius={'15px'} width={'90px'} display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5}>
        <ArrowDownwardIcon sx={{color:"#cc3300", fontSize:'20px'}}/>
        <Texts fontColor="#cc3300">{-increment}%</Texts>
      </Box>
    )
  }
}

// Function to create bus card
function BusCard({details, handleDelete, handleEdit, handleDetails}){
  // Checking availability of the bus
  const InsDate = new Date(details.insuranceExp).toISOString();
  const VRLDate = new Date(details.VRL_Exp).toISOString();
  const available = (InsDate > today && VRLDate > today);

  return(
    <Card sx={{borderRadius:'10px'}}>
      {available ? 
        <Box padding={'0 10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'35px'} bgcolor={'#e6f7f0'}>
          <CheckCircleOutlineIcon sx={{fontSize:'15px', color:'#04aa6d', mr:'5px'}}/>
          <Texts variant="caption" fontColor="#04aa6d"> Bus is ready to go. </Texts>
        </Box>
        :
        <Box padding={'0 10px'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'35px'} bgcolor={'#ffd9cc'}>
          <WarningAmberIcon sx={{fontSize:'15px', color:'#cc3300', mr:'5px'}}/>
          <Texts variant="caption" fontColor="#cc3300"> Licence / insurance was expired. </Texts>
        </Box>
      }

      <Box display={'flex'} flexDirection={'row'} height={'calc(100% - 35px)'} justifyContent={'space-around'} padding={'0 20px'} minWidth={'900px'}>
        <Grid container width={'calc(100% - 45px)'} justifyContent={'space-around'} >
          <Grid item display={'flex'} flexDirection={'column'} justifyContent={'center'} width={'180px'} >
            <Texts variant={'h4'}>{details.regNo}</Texts>
            <Texts variant={'h6'} fontColor='textSecondary' >{details.service}</Texts>
            <Texts variant={'h6'} fontColor='textSecondary' >{details.seats} Seats</Texts>
          </Grid>

          <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'180px'} mb={1}>
            <Texts variant={'h4'}>{details.rides}</Texts>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5} mb={'5px'}>
                <CommuteSharpIcon sx={{color:'#66666d', fontSize:'30px'}}/>
                <Texts variant={'h6'} fontColor='#66666d'>Total Rides</Texts>
            </Box>
            <Comparator increment={details.ridesIncrement}/> 
          </Grid>

          <Grid item display={'flex'} flexDirection={'column'} alignItems={'center'} justifyContent={'center'} width={'240px'} mb={1}>
            <Texts variant={'h4'}>LKR {details.earning}</Texts>
            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={0.5} mb={'5px'}>
              <PaymentsOutlinedIcon sx={{color:'#66666d', fontSize:'30px'}}/>
              <Texts variant={'h6'} fontColor='#66666d'>Total Earnings</Texts>
            </Box>
            <Comparator increment={details.earningIncrement}/> 
          </Grid>

          <Grid item display={'flex'} alignItems={'center'} justifyContent={'center'} width={'200px'}>
            <Rating name="half-rating-read" value={details.rating} precision={0.1} readOnly sx={{mr:1}} />
            <Texts fontSize={'18px'} >{details.rating}</Texts>
          </Grid>
        </Grid>
       
        <Stack width={'40px'} justifyContent={'space-around'} height={'100%'} spacing={1}>
          <Tooltip title='Details'>
            <IconButton onClick={()=>handleDetails(details.id)}>
              <FeedIcon/>
            </IconButton>
          </Tooltip>

          <Tooltip title='Edit'>
            <IconButton onClick={()=>handleEdit(details.id)}>
              <EditIcon/>
            </IconButton>
          </Tooltip>

          <Tooltip title='Delete'>
            <IconButton onClick={()=>handleDelete(details.id)}>
              <DeleteForeverIcon/>
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>     
    </Card>
  )
}

export default function BusGeneral({language, setLoading}) {
  const navigate = useNavigate();

  // Variable to hold dialog box state
  const [open, setOpen] = useState(false); 
  
  // Variable to store form data states
  const [form, setForm] = useState({
    open: false,
    type: null,
    data: {}
  });

  // Variable to hold bus infomation
  const [buses, setBuses] = useState({
    loaded: false,
    data: []
  });

  // Varable to hold sorting order
  const [orderBy, setOrderBy] = useState('vehicalNo');
  const [order, setOrder] = useState('asc');

  // Varible to hold selected buses
  const [selected, setSelected] = useState([]);
  const [busCount, setBusCount] = useState(0);
  const [actionList, setActionList] = useState([]);

  // Fetching bus data from backend
  useEffect(()=>{
    const fetch = async() => {
      const data = JSON.parse(localStorage.getItem('userId')) || JSON.parse(sessionStorage.getItem('userId'));
      try {
        setLoading(true);  // Enabling spinner
        const serverResponse = await GetRequest(data, 'bus/info');
        //console.log('Bus data: ', serverResponse.data);
        setBuses({loaded: true, data:serverResponse.data});
        setBusCount(serverResponse.data.length);
      } catch (error) {
        console.log('Error in fetching bus data');
      } finally {
        setLoading(false);  // Disabling spinner
      }
    }

    fetch();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Function to handle sort order
  const createSortHandler = (property) => (event) => {
    const isAsc = (orderBy === property) && (order === 'asc');
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Sorting Algorithm 
  const sortedBuses = buses.data.sort((a, b) => {
    let x;
    let y;

    if(orderBy === 'vehicalNo') {
      x = (a.regNo).localeCompare(b.regNo);
      return (order === 'asc') ? x : -x;
    } else {
      x = parseFloat(a[orderBy]);
      y = parseFloat(b[orderBy]);
      return (order === 'asc') ? (x - y) : (y - x);
    }
  });

  // Handle selected buses
  const handleSelectedBuses = (e) => {
    const {id} = e.target;
    //console.log(id, ' is selected\nList: ', selected);

    if (selected.includes(id)) {
      const newList = selected.filter(element => element !== id);
      setSelected(newList);
    } else {
      setSelected(prev => [...prev, id]);
    }
  };

  const onSelectAllClick = () => {
    //console.log('busses: ', busCount, ' Selected: ', selected.length);
    if(selected.length === 0) {
      setSelected(buses.data.map(bus => bus.id));
    } else {
      setSelected([]);
    }
  };

  // Handling details button
  const handleDetails = (id) => {
    //console.log('Request details of ', id);
    sessionStorage.setItem('busID', JSON.stringify(id));
    navigate('/mybuses/busdetails');
  };
  
  // Handling delete button
  const handleDelete = (id) => {
    //console.log('Delete ', id);
    setActionList([id]);
    setOpen(true);
  };

  // Handling list actions
  const handleList = (action) => {
    //console.log('List Action: ', action);
    if (selected.length > 0){
      switch (action) {
        case 'delete':{
          setActionList(selected);
          setOpen(true);
          break;
        } 
        case 'track':{
          //console.log('List Tracking');
          sessionStorage.setItem('TrackingList', JSON.stringify(selected));
          navigate('/mybuses/tracking');
          break;
        }              
        default:
          break;
      }
    }
  };
  
  // Handling tracking button
  const handleTrack = () => {
    //console.log('Tracking All');
    if(buses.loaded){
      const list = buses.data.map(bus => bus.id);
      sessionStorage.setItem('TrackingList', JSON.stringify(list));
      navigate('/mybuses/tracking');
    }
  };

  // Handling add new button
  const handleAddNew = () => {
    //console.log('Add New');
    setForm({
      open: true,
      type:'addNew',
      data: emptyForm
    });
  };

  // Handling edit button
  const handleEdit = (id) => {
    //console.log('Edit: ', id);
    const filteredObj = buses.data.filter(bus => bus.id === id)[0];
    console.log('Edit data: ', filteredObj);
    setForm({
      open: true,
      type: 'edit',
      data: filteredObj
    });
  };

  // Handle Refersh 
  const refresh = (timmer = 3000) => {
    //console.log('refresh');
    setTimeout(() => {
      navigate(0);    
    }, timmer+1);
  };

  // Handle Reset 
  const reset = () => {
    //console.log('reset');
    setOpen(false);
    setActionList([]);
    setSelected([]);
    setForm({
      open: false,
      type: null,
      data: {}
    });
  };

  // Handling dialog box close button
  const handleClose = () => {
    //console.log('Close Dialog Box');
    reset();
  };

  // Handling confirmation dialog box
  const handleConfirm = () => {
    setOpen(false);
    //console.log('Delete: ', actionList);
    deleteBus(actionList);
  };

  // Handling form dialog box
  const handleContinue = (data) => {
    setForm({...form, open:false});
    if (form.type === 'addNew') {
      //console.log('Save new data', data);
      saveBus(data);
    } else if (form.type === 'edit') {
      //console.log('Update data', data);
      updateBus(data);
    }
  };

  // API to delete bus
  const deleteBus = async(dataList) => {
    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await GetRequest(dataList, 'bus/delete');
      //console.log('Delete is ', serverResponse.data);
      setLoading(false);  // Disabling spinner      
      if(serverResponse.data === 'success'){
        ToastAlert({
          type: 'success',
          title: 'Delete Successfully!',
          onClose: refresh
        });
      } else {
        ToastAlert({
          type: 'error',
          title: 'Delete Failed! Try Again!',
          onClose: refresh
        });
      }
    } catch (error) {
      console.log('Error in deleting bus');
    }
  };

  // API to save new bus
  const saveBus = async(data) => {
    try {
      setLoading(true);  // Enabling spinner
      const serverResponse = await GetRequest(data, 'bus/add');
      //console.log('Bus added state: ', serverResponse.data);
      setLoading(false);  // Disabling spinner
      if(serverResponse.data === 'success'){
        ToastAlert({
          type: 'success',
          title: 'New bus added successfully!',
          onClose: refresh
        });
      } else if (serverResponse.data === 'invalid') {
        ToastAlert({
          type: 'error',
          title: 'The bus is alredy exist in the system! Please check again or contact us.',
          timer: 4000,
          onClose: reset
        });
      } else {
        ToastAlert({
          type: 'warning',
          title: 'Something went wrong please try again!',
          onClose: reset
        });
      }
    } catch (error) {
      console.log('Error in add data!');
    }
  };

  // API to save new bus
  const updateBus = async(data) => {
    try {
      setLoading(true);   // Enabling spinner
      const serverResponse = await GetRequest(data, 'bus/update');
      //console.log('Bus updated state: ', serverResponse.data);
      setLoading(false);  // Disabling spinner
      if(serverResponse.data === 'success'){
        ToastAlert({
          type: 'success',
          title: 'Bus details updated successfully!',
          onClose: refresh
        });
      } else if (serverResponse.data === 'invalid') {
        ToastAlert({
          type: 'error',
          title: 'The bus is alredy exist in the system! Please check again or contact us.',
          timer: 4000,
          onClose: reset
        });
      } else {
        ToastAlert({
          type: 'warning',
          title: 'Something went wrong please try again!',
          onClose:reset
        });
      }
    } catch (error) {
      console.log('Error in add data!');
    }
  };

  return (
    <Box width={'100%'} height={'fit-content'} padding={'20px'}>
      <Grid container spacing={2} justifyContent={'space-between'} mb={'20px'} >
        <Grid item xs={12} sm={5} md={4} lg={3} xl={2}>
          <Button variant="contained" fullWidth startIcon={<ExploreOutlinedIcon />} onClick={handleTrack}>
            Tracking My Busses
          </Button>
        </Grid>
        <Grid item xs={12} sm={4} md={3} lg={2}>
          <Button variant="contained" fullWidth startIcon={<AddCircleOutlineIcon />} onClick={handleAddNew}>
            Add New Bus
          </Button>
        </Grid>
      </Grid>
      
      <TableContainer component={Paper} sx={{overflow: 'auto', maxHeight:'100%', width:'100%', backgroundColor:'ghostwhite'}}>
        <Table stickyHeader aria-label="sticky table" >
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Checkbox
                  color="primary"
                  indeterminate={selected.length > 0 && selected.length < busCount}
                  checked={selected.length > 0 && selected.length === busCount}
                  onChange={onSelectAllClick}
                />
              </TableCell>

              <TableCell align='center'>
                <TableSortLabel
                  active={orderBy === 'vehicalNo'}
                  direction={orderBy === 'vehicalNo' ? order : 'asc'}
                  onClick={createSortHandler('vehicalNo')}
                >
                  <Texts fontSize={'14px'} >Vehicle Number</Texts>
                </TableSortLabel>
              </TableCell>

              <TableCell align='center'>
                <TableSortLabel
                  active={orderBy === 'rides'}
                  direction={orderBy === 'rides' ? order : 'asc'}
                  onClick={createSortHandler('rides')}
                >
                  <Texts fontSize={'14px'} >Rides</Texts>
                </TableSortLabel>
              </TableCell>

              <TableCell align='center'>
                <TableSortLabel
                  active={orderBy === 'earning'}
                  direction={orderBy === 'earning' ? order : 'asc'}
                  onClick={createSortHandler('earning')}
                >
                  <Texts fontSize={'14px'} >Earnings</Texts>
                </TableSortLabel>
                
              </TableCell>

              <TableCell align='center'>
                <TableSortLabel
                  active={orderBy === 'rating'}
                  direction={orderBy === 'rating' ? order : 'asc'}
                  onClick={createSortHandler('rating')}
                >
                  <Texts fontSize={'14px'} >Ratings</Texts>
                </TableSortLabel>
              </TableCell>             
            </TableRow>
          </TableHead>

          <TableBody >
            {buses.loaded && (busCount > 0 ? sortedBuses.map(data => (
              <TableRow key={data.id} sx={{cursor:'pointer'}}>
                <TableCell width={'30px'} align='center'>
                  <Checkbox
                    color="primary"
                    id={data.id}
                    checked={selected.includes(data.id)}
                    onChange={handleSelectedBuses}
                  />
                </TableCell>
                <TableCell colSpan={5}>
                  <BusCard details={data} handleDelete={handleDelete} handleEdit={handleEdit} handleDetails={handleDetails}/>
                </TableCell>
              </TableRow>              
            )) : (
              <TableRow>
                <TableCell align='center' colSpan={6}>
                  <Texts>No Buses Available!</Texts>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          {buses.loaded && busCount > 0 && <TableFooter>
            <TableRow>
              <TableCell colSpan={6} >
                <Stack width={'100%'} spacing={2} direction={'row'}>
                  <Button variant="contained" color='success' startIcon={<ExploreOutlinedIcon />} onClick={()=>{handleList('track')}}>
                    Track
                  </Button>

                  <Button variant="contained" color='error' startIcon={<DeleteForeverIcon />} onClick={()=>{handleList('delete')}}>
                    Delete
                  </Button>

                  <Button variant="contained" startIcon={<AddCircleOutlineIcon />} onClick={handleAddNew}>
                    Add New
                  </Button>
                </Stack>
              </TableCell>
            </TableRow>
            
          </TableFooter>}
        </Table>
      </TableContainer>

      <AlertDialog 
        open={open} 
        handleClose={handleClose} 
        handleConfirm={handleConfirm}
        title={'Delete Bus'} 
        message={'Are you sure you want to permenently delete this?'}
      />

      <FormDialog
        open={form.open}
        handleClose={handleClose}
        handleContinue={handleContinue}
        title={form.type === 'addNew' ? 'Adding New Bus' : 'Update Bus Details'}
        data={form.data}
      />
    </Box>
  );
}

