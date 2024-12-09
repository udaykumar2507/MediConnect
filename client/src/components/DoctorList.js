import React from "react";
import { useNavigate } from "react-router-dom";
import '../styles/DoctorListStyles.css'

const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();

  return (
    <>
      <div
        className="doctor-card"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
      >
        {/* Card Header */}
        <div className="doctor-card-header">
          <i className="fa-solid fa-user-doctor doctor-icon"></i>
        </div>

        {/* Card Body */}
        <div className="doctor-card-body">
          <h5 className="doctor-name">
            Dr. {doctor.firstName} {doctor.lastName}
          </h5>
          <p className="doctor-specialization">
            <b>Specialization:</b> {doctor.specialization}
          </p>
          <p className="doctor-fee">
            <b>Fees Per Consultation:</b> ₹{doctor.feesPerCunsaltation}
          </p>
          <p className="doctor-timings">
            <b>Timings:</b> {doctor.timings[0]} - {doctor.timings[1]}
          </p>
        </div>

        {/* Book Appointment Button */}
        <div className="doctor-card-footer">
          <button
            className="doctor-appointment-button"
            onClick={() => navigate(`/doctor/book-appointment/${doctor._id}`)}
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default DoctorList;

//feesPerCunsaltation