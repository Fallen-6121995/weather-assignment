import React from 'react'

function InfoCard({title,data,unit}) {
  return (
        <div className="info-card">{title}: {data} {unit}</div>
  )
}

export default InfoCard