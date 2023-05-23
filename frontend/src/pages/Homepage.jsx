import React from 'react'
import { hero1, hero2, search, pickMark, dropMark } from '../assets/asset'
import '../styles/homepage.css';
import Location from '../components/homepage/Location-select';
import BasicDatePicker from '../components/homepage/DatePicker';
import Time from '../components/homepage/TimePicker';
import Card from '../components/Cards';


export default function Homepage() {
  return (
    <section id='homepage'>
      <div id='hero'>
        <div><img src={ hero1 } alt="Hero1" /></div>
        <div><img src={ hero2 } alt="Hero2" /></div>
      </div>

      <div id='pick-drop'>
        <div className='drop-pick'>
          <div>
            <img src={pickMark} alt="pick" />
            Pick-Up
          </div>

          <div className='pick-drop-inner'>
            <div>
            <p>Locations</p>
              <Location />
            </div>
            <div className='vertical-line'></div>
            <div>
              <p>Date</p>
              <BasicDatePicker time={1} />
            </div>
            <div className='vertical-line'></div>
            <div>
              <p>Time</p>
              <Time time={1} />
            </div>
          </div>
        </div>

        <div className='search'>
          <img src={ search } alt="" />
        </div>

        <div className='drop-pick'>
        <div>
            <img src={dropMark} alt="drop" />
            Drop-Off
          </div>

          <div className='pick-drop-inner'>
            <div>
            <p>Locations</p>
              <Location />
            </div>
            <div className='vertical-line'></div>
            <div>
              <p>Date</p>
              <BasicDatePicker time={4} />
            </div>
            <div className='vertical-line'></div>
            <div>
              <p>Time</p>
              <Time time={4} />
            </div>
          </div>

        </div>
      </div>

      <p className='sub-head'>Popular cars</p>

      <Card />

    </section>
  )
}
