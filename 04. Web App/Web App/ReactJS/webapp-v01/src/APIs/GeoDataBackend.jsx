/*
This API is used to connect frontend with the Geo-Data Fetching server
*/

import Axios from "axios";

// Base API of the server
const GEO_DATA_URL = 'https://ipapi.co/json';

// Get data from backend
export const GetGeoData = async () => {
    try {
        console.log(`Listening to: ${GEO_DATA_URL}`);
        const response = await Axios.get(`${GEO_DATA_URL}`);
        //console.log(`Response:: ${JSON.stringify(response.data)}`);
        return response; // Note::  format: {response}
    } 
    catch (error) {
        console.error('There was an error fetching the geo Data!', error);
        throw error;
    }
};