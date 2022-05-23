import React from 'react'
import "./Offerdeclined.css"
import cross from "../images/modal/cancel.png"
const Offerdeclined = () => {
  return (
    <div className='offerdeclined'>
        <img src={cross} alt="CROSS" />
        <h2>Sorry Your offer has been declined !</h2>
      <div className='d-flex'>
      <button>Cancel</button>
      <button>Resubmit</button>
      </div>
    </div>
  )
}

export default Offerdeclined;