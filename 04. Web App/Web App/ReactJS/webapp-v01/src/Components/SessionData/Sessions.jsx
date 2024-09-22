import { GetGeoData } from "../../APIs/GeoDataBackend";
import {
  isMobile,
  isTablet,
  isBrowser,
  browserName,
  osName,
} from "react-device-detect";
import { getData } from "../../APIs/NodeBackend2";

// Mac Address Pattern
const macAddressPattern =
  /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$|^([0-9A-Fa-f]{4}\.){2}([0-9A-Fa-f]{4})$/;

// Function for Device Data
export const getDeviceData = async () => {
  try {
    const serverResponse = await getData("mac");
    const mac = serverResponse.data;
    console.log(`mac: ${mac}`);

    if (macAddressPattern.test(mac)) {
      let deviceType = "Unknown";

      // Find device type
      if (isMobile) {
        deviceType = "Mobile";
      } else if (isTablet) {
        deviceType = "Tablet";
      } else if (isBrowser) {
        deviceType = "PC";
      }

      return {
        browser: browserName,
        os: osName,
        device: deviceType,
        mac: mac,
      };
    }
    return "error";
  } catch (error) {
    console.log("Error in getting MAC");
    return "error";
  }
};

// Function for Session Data
export const getSessionData = async () => {
  try {
    // Get Geo Data
    const serverResponse = await GetGeoData();
    const { ip, country_name, latitude, longitude } = serverResponse.data;

    // Get Date and Time
    const session = new Date();
    const date = session.toDateString();
    const time = session.toLocaleTimeString();

    // Get Device Data
    const deviceData = await getDeviceData();
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
      latitude: latitude,
    };

    return sessionData;
  } catch (error) {
    console.error("Error fetching session data:", error);
    return "error in fetching data";
  }
};
