import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import DevicesTwoToneIcon from '@mui/icons-material/DevicesTwoTone';
import PaymentTwoToneIcon from '@mui/icons-material/PaymentTwoTone';
import NavigateBeforeTwoToneIcon from '@mui/icons-material/NavigateBeforeTwoTone';
import ExitToAppTwoToneIcon from '@mui/icons-material/ExitToAppTwoTone';
import BookOnlineTwoToneIcon from '@mui/icons-material/BookOnlineTwoTone';
import HomeTwoToneIcon from '@mui/icons-material/HomeTwoTone';
import NavigateNextTwoToneIcon from '@mui/icons-material/NavigateNextTwoTone';
import AccountBalanceWalletTwoToneIcon from '@mui/icons-material/AccountBalanceWalletTwoTone';
import { useLocation, useNavigate } from 'react-router-dom';
import './Menu.css';


export default function MenuBar({ setIsLogged, language }) {
  // variable for navigations  
  const navigate = useNavigate();

  // Variable to hold user Type
  const userType = JSON.parse(localStorage.getItem('userType')) || JSON.parse(sessionStorage.getItem('userType'));

  // variable to store the menu mode (collapsed or not)
  const [isCollapsed, setIsCollapsed] = useState(false);

  // variable to store current nested page
  const state = useLocation().pathname.split("/")[2];

  // handle collapsed
  const handleCollapsed = () => {
    setIsCollapsed(!isCollapsed);
  }

  // Handling states
  const handleState = (e) => {
    const newState = e.currentTarget.getAttribute('data-id');
  
    if (newState === 'settings') {
      // Direct navigation to the settings page using href functionality
      window.location.href = '/dashboard/settings';
    } else {
      // Use the navigate function for other states
      navigate(`/dashboard/${newState}`);
    }
  };
  

  // handle logout button
  const logout = () =>{
    setIsLogged('false');
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
            
            {userType === 'owner' && <Container 
                data-id='earnings' 
                onClick={handleState}
                className={`clickable-container ${state === 'earnings' ? 'active' : ''}`}
            >
                <AccountBalanceWalletTwoToneIcon className='icon'/> 
                <span> Earnings</span>
            </Container>}

            <Container 
                data-id='transactions' 
                onClick={handleState}
                className={`clickable-container ${state === 'transactions' ? 'active' : ''}`}
            >
                <PaymentTwoToneIcon className='icon'/> 
                <span> Transactions</span>
            </Container>
            
            <Container 
                data-id='tickets' 
                onClick={handleState} 
                className={`clickable-container ${state === 'tickets' ? 'active' : ''}`}
            >
                <BookOnlineTwoToneIcon className='icon'/> 
                <span> Tickets</span>
            </Container>
            
            <Container 
                data-id='devices' 
                onClick={handleState}
                className={`clickable-container ${state === 'devices' ? 'active' : ''}`}
            >
                <DevicesTwoToneIcon className='icon'/> 
                <span> Devices</span>
            </Container>
        
            {/*<Container 
                data-id='messages' 
                onClick={handleState}
                className={`clickable-container ${state === 'messages' ? 'active' : ''}`}
            >
                <MarkEmailUnreadTwoToneIcon className='icon'/> 
                <span> Messages</span>
            </Container>*/}
            
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

            {userType === 'owner' && <Container 
                data-id='earnings' 
                onClick={handleState}
                className={`clickable-container ${state === 'earnings' ? 'active' : ''}`}
            >
                <AccountBalanceWalletTwoToneIcon className='icon'/> 
            </Container>}
            
            <Container 
                data-id='transactions' 
                onClick={handleState}
                className={`clickable-container ${state === 'transactions' ? 'active' : ''}`}
            >
                <PaymentTwoToneIcon className='icon'/> 
            </Container>
            
            <Container 
                data-id='tickets' 
                onClick={handleState} 
                className={`clickable-container ${state === 'tickets' ? 'active' : ''}`}
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
        
            {/*<Container 
                data-id='messages' 
                onClick={handleState}
                className={`clickable-container ${state === 'messages' ? 'active' : ''}`}
            >
                <MarkEmailUnreadTwoToneIcon className='icon'/> 
            </Container>*/}
            
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
