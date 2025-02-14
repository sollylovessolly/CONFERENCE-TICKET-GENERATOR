import React from "react";
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../styles/Ticket.css";

const Ticket = () => {
  const ticketData = JSON.parse(localStorage.getItem("ticketData")) || {};
  const storedFormData = JSON.parse(sessionStorage.getItem('form')) || {};
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/');
  };

  const handleDownload = () => {
    const input = document.getElementById('ticket');
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 160);
      pdf.save("ticket.pdf");
    });
  };

  return (
    <div className="bg">
      <div className="main-container1">
        <div className="header-container">
          <h2 className="heading">Ready</h2>
          <span className="step">Step 3/3</span>
        </div>

        <div className="underline">
          <div id="colored"></div>
          <div></div>
        </div>

        <div className="ticket-container" id="ticket">
          <h1>Your Ticket is Booked</h1>
          <p>Check your email for a copy or you can download</p>

          <div className="ticket-card">
            <div className="ticket-content">
              <h1>Techember fest "25</h1>
              <p>📍 04 Rumens road, Ikoyi, Lagos</p>
              <p>📅 March 15, 2025 | 7:00 PM</p>
              <div className="img">
                <img src={ticketData.avatarUrl} alt="Avatar" className="ticket-avatar" />
              </div>
              <div className="ticket-details">
                <div className="details-grid">
                  <div><p>Name:</p> {ticketData.fullName || "N/A"}</div>
                  <div><p>Email:</p> {ticketData.email || "N/A"}</div>
                  <div><p>Ticket Type:</p>{storedFormData.ticketType || "N/A"}</div>
                  <div><p>Ticket Number:</p>{storedFormData.ticketNum || "N/A"}</div>
                </div>
                <div className="special-request">
                  <p>Special Request:</p>
                  <p>{ticketData.specialRequest || "None"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="buttons">
          <button className="btn" onClick={handleNext}>Book Another Ticket</button>
          <button className="btn primary" onClick={handleDownload}>Download Ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Ticket;
