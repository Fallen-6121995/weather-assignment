import React from 'react'

function FavcityCard({name,handleclick}) {
  return (
    <div className='fav-card' onClick={() => handleclick(name)}>
        <p>{name}</p>
    </div>
  )
}

export default FavcityCard