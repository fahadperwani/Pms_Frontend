import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

function BookAppointment() {
  const location = useLocation();
  const token = useSelector((state) => state.token);
  const [slots, setSlots] = useState([]);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [resp, setResp] = useState([]);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7062/api/appointment/slots/${location.state.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResp([...response.data]);
        // console.log("response: ", JSON.stringify(response.data));
        console.log("resp: " + resp[0]);
        const formattedSlots = response.data.map((slot) => {
          const slotDate = new Date(slot);
          const isToday = slotDate.getDate() === new Date().getDate();
          const label = isToday
            ? slotDate.toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })
            : slotDate.toLocaleString();
          return { value: slot.id, label };
        });
        setSlots(formattedSlots);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSlots();
  }, [location.state.id, token, resp]);

  const handleSlotSelect = (event) => {
    const selectedIndex = event.target.selectedIndex; // Get the selected index
    setSelectedSlotIndex(selectedIndex); // Update the state with index
  };

  const handleBookAppointment = async () => {
    if (selectedSlotIndex === null) {
      alert("Please select a slot before booking an appointment.");
      return;
    }

    const selectedSlotId = resp[selectedSlotIndex - 1]; // Access slot ID using index
    console.log(selectedSlotId);

    const data = {
      doctorId: location.state.id,
      date: selectedSlotId,
    };
    try {
      const response = await axios.post(
        "https://localhost:7062/api/appointment/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data); // Handle success or error
      alert("Appointment is booked");
      setResp([]);
      setSlots([]);
      setSelectedSlotIndex(null);
    } catch (error) {
      console.error(error); // Handle error
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">
        Book Appointment with {location.state.name}
      </h1>
      <p className="text-gray-600">
        Specialization: {location.state.specialization}
      </p>

      <select
        className="border rounded p-2 mb-4"
        value={selectedSlotIndex !== null ? slots[selectedSlotIndex].value : ""} // Update value based on index
        onChange={handleSlotSelect}
      >
        <option value="">Select a Slot</option>
        {slots.map((slot, i) => (
          <option key={slot.value} value={i}>
            {slot.label}
          </option>
        ))}
      </select>

      {selectedSlotIndex !== null && selectedSlotIndex > 0 && (
        <div className="bg-white shadow-md rounded p-4 mt-4">
          <h2 className="text-lg font-bold">Book Appointment</h2>
          <p className="text-gray-600">
            You have selected {slots[selectedSlotIndex - 1].label} with{" "}
            {location.state.name}
          </p>
          <button
            onClick={handleBookAppointment}
            className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          >
            Book Appointment
          </button>
        </div>
      )}
    </div>
  );
}

export default BookAppointment;
