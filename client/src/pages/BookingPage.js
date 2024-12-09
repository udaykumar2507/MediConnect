import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import '../styles/BookingPageStyles.css'

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState({});
  const [date, setDate] = useState("");
  const [time, setTime] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        const res = await axios.post(
          "/api/v1/doctor/getDoctorById",
          { doctorId: params.doctorId },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res.data.success) {
          setDoctors(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getDoctorData();
  }, [params.doctorId]);

  const handleAvailability = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/booking-availbility",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  const handleBooking = async () => {
    if (!date || !time) {
      return message.error("Please select a date and time");
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          userInfo: user,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="layout">
        <div className="booking-card">
          <h3>Booking Page</h3>
          {doctors && (
            <div className="doctor-info">
              <h4>
                Dr. {doctors.firstName} {doctors.lastName}
              </h4>
              <h4>
                Fees: <span>{doctors.feesPerCunsaltation}</span>
              </h4>
              <h4>
                Timings:{" "}
                <span>
                  {doctors.timings && doctors.timings[0]} -{" "}
                  {doctors.timings && doctors.timings[1]}
                </span>
              </h4>
            </div>
          )}
          <div>
            <DatePicker
              className="m-2"
              format="DD-MM-YYYY"
              onChange={(value) => setDate(moment(value).format("DD-MM-YYYY"))}
            />
            <TimePicker
              className="m-2"
              format="HH:mm"
              onChange={(value) => setTime(moment(value).format("HH:mm"))}
            />
            <button
              className="booking-button booking-button-primary"
              onClick={handleAvailability}
            >
              Check Availability
            </button>
            <button
              className="booking-button booking-button-secondary"
              onClick={handleBooking}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BookingPage;
