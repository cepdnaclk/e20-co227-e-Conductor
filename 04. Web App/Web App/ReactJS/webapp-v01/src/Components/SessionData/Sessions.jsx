import { GetGeoData } from '../../APIs/GeoDataBackend';
import { isMobile, isTablet, isBrowser, browserName, osName } from 'react-device-detect';
//const { address } = require('address');

// Function for Device Data
export const getDeviceData = () => {
  let deviceType = 'Unknown';

  if (isMobile) {
    deviceType = 'Mobile';
  } else if (isTablet) {
    deviceType = 'Tablet';
  } else if (isBrowser) {
    deviceType = 'PC';
  }

  // Get Device MAC Address
  //const mac = getMACAddrerss();
  //console.log(`MAC Address: ${mac}`);

  return {
    browser: browserName,
    os: osName,
    device: deviceType,
    mac: '86:61:be:3d:97:3a', //mac  :: use this if there is an issue in the backend
  };
};

/*
// Function for Device MAC Address
const getMACAddrerss = () =>{
  let mac = "";
  address((err, addrs) => {
    console.log(addrs.ip, addrs.ipv6, addrs.mac);
    mac = addrs.mac;
  });
  return mac;
}
*/

// Function for Session Data
export const getSessionData = async () => {
  try {
    // Get Geo Data
    const serverResponse = await GetGeoData();
    const {ip, country_name, latitude, longitude} = serverResponse.data;

    // Get Date and Time
    const session = new Date();
    const date = session.toDateString();
    const time = session.toLocaleTimeString(); 

    // Get Device Data
    const deviceData = getDeviceData();
    //console.log(`${JSON.stringify(deviceData)}`);  

    // Update userData
    //console.log(`ServerResponse on ${date} at ${time}:: device log: ${deviceData.device}/${deviceData.os}/${deviceData.browser} ip:${ip}  country:${country_name}  latitude:${latitude}  longitude:${longitude}`);
    const sessionData = {
        device: deviceData.device,
        OS: deviceData.os,
        browser: deviceData.browser,
        MAC: deviceData.mac,
        IP: ip,
        date: date,
        time: time,
        country: country_name,
        longitude: longitude,
        latitude: latitude
      };

    return sessionData;

  } catch (error) {
      console.error('Error fetching session data:', error);
      return("error in fetching data");
  }
};

