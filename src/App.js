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
import { Provider, useSelector } from "react-redux";
import store from "./store/store";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                user && user.Specialization == "" ? (
                  <SearchDoctor />
                ) : (
                  <Appointments />
                )
              }
            />
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointments" element={<Appointments />} />
          </Route>

          {/* Redirect to login for any unauthorized access attempts */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
