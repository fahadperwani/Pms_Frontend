import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoute from "./routing/PrivateRoute";
import SearchDoctor from "./components/SearchDoctor";
import BookAppointment from "./components/BookAppointment";
import Appointments from "./components/Appointments";
import { useContext, useEffect } from "react";
import axios from "axios";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute />}>
            {/* <Route index element={<SearchDoctor />} /> */}
            <Route path="/" element={<SearchDoctor />} />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>

          {/* Redirect to login for any unauthorized access attempts */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
      );
    </div>
  );
}

export default App;
