/*
This API is used to connect frontend with the own nodeJS backend server
*/

import axios from "axios";

// Base API of the server
const API_BASE_URL = process.env.REACT_APP_LOCAL_BACKEND_URL;
//const API_BASE_URL = process.env.REACT_APP_RAILWAY_BACKEND_URL;
//const API_BASE_URL = process.env.REACT_APP_RAILWAY_DEMO_BACKEND_URL;

// Get data from backend
export async function getData(page) {
  try {
    const destination = `${API_BASE_URL}/${page}`;
    //console.log(`Fetching data from: ${destination}`);
    const response = await axios.get(destination);
    return response;
  } catch (error) {
    console.error("There was an error fetching the data!", error);
    throw error;
  }
}

// Update data in backend
export async function updateData(sendData, page) {
  try {
    const destination = `${API_BASE_URL}/${page}`;
    //console.log(`Updating data in: ${destination}`);
    const response = await axios.patch(destination, sendData);
    return response;
  } catch (error) {
    console.error("Updating data error!", error);
    throw error;
  }
}

// Add new data in backend
export async function addData(sendData, page) {
  try {
    const destination = `${API_BASE_URL}/${page}`;
    //console.log(`Adding new data in: ${destination}`);
    const response = await axios.post(destination, sendData);
    return response;
  } catch (error) {
    console.error("Adding data error!", error);
    throw error;
  }
}

// Add new data in backend -- Need to midify
export async function deleteData(sendData, page) {
  try {
    const destination = `${API_BASE_URL}/api/${page}`;
    //console.log(`Deleting excisting data in: ${destination}`);
    const response = await axios.delete(destination, { data: sendData });
    return response;
  } catch (error) {
    console.error("Deleting data error!", error);
    throw error;
  }
}
