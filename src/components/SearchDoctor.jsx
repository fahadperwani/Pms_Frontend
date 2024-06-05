import React, { useState, useEffect } from "react";
import axios from "axios";

function SearchDoctor() {
  const [doctorName, setDoctorName] = useState("");
  const [doctors, setDoctors] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(`https://localhost:7062/api/doctor/${doctorName}`)
      .then((response) => {
        console.log(response.data);
        setDoctors(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  //   useEffect(() => {
  //     axios
  //       .get("https://example.com/api/doctors/")
  //       .then((response) => {
  //         setDoctors(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   }, []);

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold mb-4">Search Doctor</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="doctorName"
            className="block text-sm font-medium text-gray-700"
          >
            Doctor Name
          </label>
          <input
            type="text"
            id="doctorName"
            value={doctorName}
            onChange={(event) => setDoctorName(event.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-2 px-4 rounded"
        >
          Search
        </button>
      </form>
      {doctors && (
        <table className="w-full text-sm text-gray-700">
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Appointment</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => (
              <tr key={doctor.id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>
                  <button
                    className="bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-bold py-2 px-4 rounded"
                    onClick={() => bookAppointment(doctor.id)}
                  >
                    Book Appointment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

const bookAppointment = (doctorId) => {
  // Call API to book appointment with doctorId
  axios
    .post(`https://example.com/api/appointments`, { doctorId })
    .then((response) => {
      console.log("Appointment booked successfully!");
    })
    .catch((error) => {
      console.error(error);
    });
};

export default SearchDoctor;
