import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import MarkEmailUnreadTwoToneIcon from '@mui/icons-material/MarkEmailUnreadTwoTone';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import NavigateBeforeTwoToneIcon from '@mui/icons-material/NavigateBeforeTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import BookOnlineTwoToneIcon from '@mui/icons-material/BookOnlineTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import { useNavigate } from 'react-router-dom';
import './Menu.css';


export default function MenuBar({ state, setState, language }) {
  // variable for navigations  
  const navigate = useNavigate();

  // variable to store the menu mode (collapsed or not)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // handle collapsed
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  // Handling states
  const handleState = (e) =>{
    const newState = e.currentTarget.getAttribute('data-id');
    //console.log(`1. Dashboard State: ${newState}`);  
    setState(newState); 
  }

  // handle logout button
  const logout = () =>{
    localStorage.removeItem('userId');
    navigate('/');
  }

  return (
    !isCollapsed ? (
        <Container className='menuBar'>
            <Container className='topic'>
                <span> Dashboard</span>
                <NavigateBeforeTwoToneIcon className='icon' onClick={handleCollapsed}/>
            </Container>

            <Container 
                data-id='general'  
                onClick={handleState} 
                className={`clickable-container ${state === 'general' ? 'active' : ''}`}
            >
                <HomeTwoToneIcon className='icon'/> 
                <span> General</span>
            </Container>
            
            <Container 
                data-id='payments' 
                onClick={handleState}
                className={`clickable-container ${state === 'payments' ? 'active' : ''}`}
            >
                <PaymentTwoToneIcon className='icon'/> 
                <span> Payments</span>
            </Container>
            
            <Container 
                data-id='bookings' 
                onClick={handleState} 
                className={`clickable-container ${state === 'bookings' ? 'active' : ''}`}
            >
                <BookOnlineTwoToneIcon className='icon'/> 
                <span> Bookings</span>
            </Container>
            
            <Container 
                data-id='devices' 
                onClick={handleState}
                className={`clickable-container ${state === 'devices' ? 'active' : ''}`}
            >
                <DevicesTwoToneIcon className='icon'/> 
                <span> Devices</span>
            </Container>
        
            <Container 
                data-id='messages' 
                onClick={handleState}
                className={`clickable-container ${state === 'messages' ? 'active' : ''}`}
            >
                <MarkEmailUnreadTwoToneIcon className='icon'/> 
                <span> Messages</span>
            </Container>
            
            <Container 
                data-id='settings' 
                onClick={handleState}
                className={`clickable-container ${state === 'settings' ? 'active' : ''}`}
            >
                <SettingsTwoToneIcon className='icon'/> 
                <span> Settings</span>
            </Container>

            <Container onClick={logout}>
                <ExitToAppTwoToneIcon className='icon'/> 
                <span> Logout</span>
            </Container>
        </Container>
    ):(
        <Container className='Collapsed-menuBar'>
            <Container className='topic'>
                <NavigateNextTwoToneIcon className='icon' onClick={handleCollapsed}/>
            </Container>

            <Container 
                data-id='general'  
                onClick={handleState} 
                className={`clickable-container ${state === 'general' ? 'active' : ''}`}
            >
                <HomeTwoToneIcon className='icon'/> 
            </Container>
            
            <Container 
                data-id='payments' 
                onClick={handleState}
                className={`clickable-container ${state === 'payments' ? 'active' : ''}`}
            >
                <PaymentTwoToneIcon className='icon'/> 
            </Container>
            
            <Container 
                data-id='bookings' 
                onClick={handleState} 
                className={`clickable-container ${state === 'bookings' ? 'active' : ''}`}
            >
                <BookOnlineTwoToneIcon className='icon'/> 
            </Container>
            
            <Container 
                data-id='devices' 
                onClick={handleState}
                className={`clickable-container ${state === 'devices' ? 'active' : ''}`}
            >
                <DevicesTwoToneIcon className='icon'/> 
            </Container>
        
            <Container 
                data-id='messages' 
                onClick={handleState}
                className={`clickable-container ${state === 'messages' ? 'active' : ''}`}
            >
                <MarkEmailUnreadTwoToneIcon className='icon'/> 
            </Container>
            
            <Container 
                data-id='settings' 
                onClick={handleState}
                className={`clickable-container ${state === 'settings' ? 'active' : ''}`}
            >
                <SettingsTwoToneIcon className='icon'/> 
            </Container>

            <Container onClick={logout}>
                <ExitToAppTwoToneIcon className='icon'/> 
            </Container>
        </Container>
    )
  )
}
