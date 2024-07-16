/*
This API is used to connect frontend with the Geo-Data Fetching server
*/

import Axios from "axios";

// Get data from backend
export const GetGeoData = async () => {
    try {
        console.log(`Listening to: ${process.env.REACT_APP_GEODATA_URL}`);
        const response = await Axios.get(`${process.env.REACT_APP_GEODATA_URL}`);
        //console.log(`Response:: ${JSON.stringify(response.data)}`);
        return response; // Note::  format: {response}
    } 
    catch (error) {
        console.error('There was an error fetching the geo Data!', error);
        throw error;
    }
};