import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import '../styles/SelectTicket.css'
import { ticketDetails } from '../utils/utils';

const SelectTicket = () => {
  const {form, setForm} = useOutletContext() 
  const [ticketType, setTicketType] = useState(null);
  const [ticketNum, setTicketNum] = useState(0);
  const navigate = useNavigate();
  const handleTicketType = (ticket) =>{
    if(ticket){
      setTicketType(ticket)
    }
  }
 const handleTicketNumber = ({target}) =>{
  const number = parseInt(target.value, 10)
  if(number){
    setTicketNum(number)

  }
 }
 const handleTicketSubmit = (e) =>{
  e.preventDefault()
  console.log(ticketNum)
  console.log(ticketType);
  if (ticketType && ticketNum) {
    const updatedData = {
        ...form,
        ticketNum,
        ticketType: ticketType.plan,
  };
  setForm(updatedData)
  sessionStorage.setItem('form', JSON.stringify(updatedData))
  //this saves our data in the session
  navigate('/attendee-details');
}
  
 }
 useEffect(()=>{
  const storedFormData = sessionStorage.getItem('form')
  if(storedFormData){
    const { ticketType, ticketNum } = JSON.parse(storedFormData);
    if(ticketType && ticketNum){
      setTicketNum(ticketNum || 0)
      setTicketType(ticketType || null)
    }
  }
 }, [])
 console.log(form);
 
 
 

  return (
    <div>
      <div className="bg">
        <div className="main-container">
          <div className="header-container">
            <div className="heading">Ticket Selection</div>
            <div className="step">Step 1/3</div>
          </div>
          
          <div className="underline"><div id='colored'></div><div></div></div>
          <div className="selection-container">
            <div className="box-main">
              <h1 className='road-rage-regular' id='road-rage'>Techember Fest ''25</h1>
              <p>join us for an unforgettable experience at this Techember fest! secure your spot now.</p>
              <p>📍lagos || march 15, 2025 | 7:00 PM</p>
            </div>
            <div className="hr"></div>
            <div>Select Ticket type</div>
            <div className="second-main-box" >
              {ticketDetails.map((ticket, index) =>{
                return(<div id="box1" className={`ticket-box ${ticketType === ticket ? 'active' : ''}`} key={index} onClick={()=>handleTicketType(ticket)}>
                <h1>{ticket.plan}</h1>
                <p>{ticket.access}</p>
                <p>20/52</p>
              </div>)
                 })}
                 {/*this was used to map from the utils file*/}
              {/* <div id="box1" onClick={(e)=>handleTicketType(e)}>
                <h1>Free</h1>
                <p>REGULAR ACCESS</p>
                <p>20/52</p>
              </div> */}
              {/* <div id="box2">
              <h1>$150</h1>
                <p>VIP ACCESS</p>
                <p>20/52</p>
              </div>
              <div id="box3">
              <h1>$250</h1>
                <p>VVIP ACCESS</p>
                <p>20/52</p>
              </div> */}
            </div>
            <div>
              <div className="quantity-div">
              <label for="quantity">Select Number Of Tickets:</label>
                
                <select id="quantity" value={ticketNum} onChange={handleTicketNumber}>

                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">5</option>


                  </select>
              </div>
            </div>
            <button id='bottom-button'>cancel</button>
            <button onClick={handleTicketSubmit} id='next-button'>Next</button>
          </div>
          </div>

          
          
        </div>
     
      
    </div>
  )
}

export default SelectTicket