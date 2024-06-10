import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const token = useSelector((state) => state.token); // Assuming token is stored in localStorage
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7062/api/appointment",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response);
        setAppointments(response.data.$values);
      } catch (error) {
        console.error(error);
        // Handle errors appropriately (e.g., display an error message)
      }
    };

    fetchAppointments();
  }, [token]);

  const handleAppointmentClick = (appointmentId) => {
    // Implement logic to handle clicking the appointment button (e.g., navigate to a details page)
    console.log("Appointment clicked:", appointmentId);
  };

  return (
    <div className="container mx-auto p-4">
      <h1>Appointments</h1>
      <table className="table-auto w-full border border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">
              {user.isDoctor ? "Patient Name" : "Doctor Name"}
            </th>
            <th className="border px-4 py-2">Specialization</th>
            <th className="border px-4 py-2">Date & Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <td className="border px-4 py-2">
                {user.isDoctor
                  ? appointment.doctorName
                  : appointment.patientName}
              </td>
              <td className="border px-4 py-2">
                {appointment.doctorSpecialization}
              </td>
              <td className="border px-4 py-2">{appointment.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Appointments;
