import { Navbar } from '@mantine/core';
import '../seatBooking/seatBooking.css'

import theaterScreen from './theaterScreen.png';

import React from 'react'
import Navigation from '../Navigation/Navigation';
//mport { useScrollIntoView } from '@mantine/hooks';
import { useState } from 'react';
import { useContext } from 'react';
import { MyModalContext } from '../../App';
import { TheaterSeats } from './theaterSeats';


const theaterName = ["PVR Cinema", "Metro INOX Cinema", "Cinepolis", "Carnival Cinemas", "SRS Cinemas"];
const showTime = ["10:15 AM", "12:45 PM", "3:15 PM", "5:45 PM", "9:15 PM"];
const theaterSeats = ["0","1","2","3","4","5","6","7","8","9"];

const SeatBooking = () => {

  const { modalData, setModalData }  = useContext(MyModalContext)

  const [date,setDate] = useState(null);
  

  const options = (arr, name) => {
    return arr.map((item, index) => {
      return (
        <option value={index} key={name + index}>
          {item}
        </option>
      );
    });
  };

  const dateOfBooking = (e) => {
    setDate(e.target.value);
  }

  return (
    
    <div className="book">
    <Navigation />
      <h3 className='bookHeading'>Book Ticket</h3>
      <p>
        <span className="heading">Movie: </span>
        {modalData.heading}
      </p>

      <div className="Booking-nav">
        <div className="border-class">
          <select className="select-theater">
            {options(theaterName, "theater")}
          </select>
        </div>
        <div className="border-class">
          <input type="date" onChange={dateOfBooking} />
        </div>
        <div className="border-class">
          <select className="select-theater">
            {options(showTime, "time")}
          </select>
        </div>
      </div>
      <div className="ticket">

      <div className='theater-screen'>
        <img src={theaterScreen} alt="theater screen" />
       </div>
        <div className="seats-section"><TheaterSeats BookingDate={date} Seats={theaterSeats} movieName={modalData.heading} /></div>
      </div>
    </div>
  );
}

export default SeatBooking