import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SelectTicket from "./components/SelectTicket";
import AttendeeDetails from "./components/AttendeeDetails";
import Ticket from "./components/Ticket";
// import Navbar from "./components/Navbar";
import './styles/App.css'
import RouteLayout from "./layout/RouteLayout";

const App = () => (
  <div className="container">
  <Router>
    {/* <Navbar /> */}
    <Routes>
      <Route element={<RouteLayout/>}>
        <Route path="/" element={<SelectTicket />} />
        <Route path="/attendee-details" element={<AttendeeDetails />} />
        <Route path="/ticket-confirmation" element={<Ticket />} />
      </Route>
      
    </Routes>
  </Router>
  </div>
);

export default App;
