import React from 'react'
import { car, gas, transmission, like, unlike, users } from '../assets/asset';

export default function Cards(props) {
  return (
    <div>
      <div>
        <div>koenigsegg</div>
        <img src={unlike} alt="" />
      </div>
      <p>Sport</p>

      <div><img src={car} alt="image" /></div>

      <div>
        <div><img src={gas} alt="fuel" /> <span>90L</span></div>
        <div><img src={transmission} alt="transmission" /> <span>Manual</span></div>
        <div><img src={users} alt="peoples" /> <span>2 People</span></div>
      </div>

      <div>
        <div>₹99.00/ <span>day</span></div>
        <div>More info</div>
      </div>
      
    </div>
  )
}
