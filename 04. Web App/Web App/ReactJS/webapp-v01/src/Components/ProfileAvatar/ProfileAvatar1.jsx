import { Dropdown } from 'bootstrap'
import React from 'react'
import { FaIcons } from 'react-icons/fa'

function ProfileAvatar1({language, setUser}) {


  return (
    <div>
      <Dropdown>
        <Dropdown.Toggle className='dropdwn' variant='light' id="dropdown-basic">
          <FaIcons/>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>                
          <Dropdown.Item id='sn' >සිංහල</Dropdown.Item>
          <Dropdown.Item id='en' >English</Dropdown.Item>
          {/*<Dropdown.Item id='தமிழ்' onClick={handleLanguage}>தமிழ்</Dropdown.Item>*/}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}

export default ProfileAvatar1
