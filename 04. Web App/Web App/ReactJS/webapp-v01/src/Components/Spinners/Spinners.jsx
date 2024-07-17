import React from 'react'
import { Bars, RotatingLines, ThreeDots } from 'react-loader-spinner';
import './Spinners.css'

export function MyRotatingLines() {
  return (
    <div className="spinner-overlay">
      <RotatingLines
        strokeColor="ghostwhite"
        strokeWidth="5"
        animationDuration="0.75"
        width="96"
        visible={true}
      />
    </div>
  )
}

export function MyBars(){
  return (
    <div className="spinner-overlay">
      <Bars
        height="100"
        width="100"
        color="ghostwhite"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  )
}

export function MyThreeDots(){
  <div className="spinner-overlay">
      <ThreeDots 
        height="100" 
        width="100" 
        radius="9"
        color="#ghostwhite" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
    </div>
}