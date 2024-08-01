import React from 'react'
import './Home.css'
import TempMap from '../Components/Map/TempMap'

export default function Home({ language }) {

  return (
    <div >
      <h1>About</h1>
      <h3>Language: {language} </h3>
      <TempMap/>
    </div>
  )
}
