import React from 'react'
import './Home.css'

export default function Home({ language }) {

  return (
    <div >
      <h1>About</h1>
      <h3>Language: {language} </h3>
    </div>
  )
}
