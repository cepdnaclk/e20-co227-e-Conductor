import React, { useRef, useEffect, useState } from 'react';
import Invoice from '../Components/Invoice/Invioce';
import { useReactToPrint } from 'react-to-print';
import { AppBar, Badge, Box, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import { Request } from '../APIs/NodeBackend';

export default function InvoicePage({ isLogged, language }) {
  // Sheet sizes
  const A4_WIDTH = 210 * 3.7795275591; // in cm -> px
  const A4_HEIGHT = 297 * 3.7795275591; // in cm -> px

  // Getting Ticket Id
  const ticketNo = JSON.parse(localStorage.getItem('TicketNo'));

  // Ticket data
  const [data, setData] = useState({});

  // Requesting transaction data from node backend
  const getData = async (value) => {
    // Creating data object
    const data = {
      type: 'Req8',   // Get invoice infomation from backend
      data: value
    }
    //console.log(`Request message::   type: ${data.type}      data: ${data.data}`);

    try {
        const serverResponse = await Request(data, 'tickets');
        //console.log(`Invoice Data:: ${JSON.stringify(serverResponse.data)}`);
        setData(serverResponse.data);
    } catch (error) {
        console.error('Error fetching invoice data:', error);
    }
  };

  // Resizing
  const [scale, setScale] = useState(1);

  // Navigating
  const navigate = useNavigate();

  useEffect(() => {
    getData(ticketNo);

    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      const scaleFactor =  (viewportWidth < A4_WIDTH) ? (viewportWidth / A4_WIDTH) : 1;
      setScale(scaleFactor);
    };

    handleResize(); // Initial call to set scale based on initial window size
    window.addEventListener('resize', handleResize); // Adjust scale on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Manual Zooming
  const handleZoom = (e) => {
    // ZoomIn => Increase size
    //console.log(`${e} is clicked`);
    let newScale = (e === 'zoomIn' ? scale+0.1 : scale-0.1);
    setScale((newScale > 0.5 && newScale < 2.1) ? newScale : scale);
  }

  // Handle Printing
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  // Hnadle Download
  const handleDownload = async () => {
    const element = componentRef.current;
    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'px', [A4_WIDTH, A4_HEIGHT]);
    pdf.addImage(imgData, 'PNG', 0, 0, A4_WIDTH, A4_HEIGHT);
    pdf.save('invoice.pdf');
  };

  return ticketNo === null ? (
    navigate('/forbidden')
  ) : (
    <Box sx={{ flexGrow: 1, width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <AppBar position="sticky" sx={{ bgcolor: 'rgb(0,0,0,0.8)', width: '100vw', border:'none' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Grid>
            <Typography sx={{fontFamily:'Open Sans', fontWeight:'bold', fontSize:'16px'}}>
              Invoice.pdf
            </Typography>
          </Grid>

          <Grid sx={{
            width: 'auto',
            display:'flex',
            justifyContent:'space-around',
            alignItems: 'center',
            gap:'5px',
          }}>
            <IconButton
              size="small"
              color="inherit"
              sx={{ '&:hover': { bgcolor: 'rgb(204,204,204,0.2)' } }}
              onClick={()=>{handleZoom('zoomIn')}}
            >
              <Badge>
                <AddIcon />
              </Badge>
            </IconButton>

            <Typography
              //onInput={false}
              sx={{
                width:'60px', 
                height: '22px',
                color:'white', 
                fontFamily:'Open Sans',
                fontSize:'14px',
                fontWeight:'bold',
                bgcolor:'rgb(0,0,0,0.9)',
                textAlign:'center'
              }}
            >
              {(scale * 100).toFixed(0)}%
            </Typography>
                      
            <IconButton
              size="small"
              color="inherit"
              sx={{ '&:hover': { bgcolor: 'rgb(204,204,204,0.2)' } }}
              onClick={()=>{handleZoom('zoomOut')}}
            >
              <Badge>
                <RemoveIcon />
              </Badge>
            </IconButton>
          </Grid>
          
          <Grid sx={{width:'80px', display:'flex',justifyContent:'space-between'}}>
            <IconButton
              size="small"
              color="inherit"
              sx={{ '&:hover': { bgcolor: 'rgb(204,204,204,0.2)' } }}
              onClick={handleDownload}
            >
              <Badge>
                <DownloadIcon />
              </Badge>
            </IconButton>
                      
            <IconButton
              size="small"
              color="inherit"
              sx={{ '&:hover': { bgcolor: 'rgb(204,204,204,0.2)' } }}
              onClick={handlePrint}
            >
              <Badge>
                <PrintIcon />
              </Badge>
            </IconButton>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          width: '100%',
          height: '100%',
          background: '#666666',
          overflow: 'auto',
          pt:'5px'
        }}
      >
        <div
          ref={componentRef}
          style={{
            transform: `scale(${scale})`,
            transformOrigin:'top left'
          }}
        >
          <Invoice data={data} />
        </div>
      </Grid>
    </Box>
  );
}
