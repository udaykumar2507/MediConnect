import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row } from "antd";
import DoctorList from "../components/DoctorList";
import "../styles/HomePageStyles.css";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  // Fetch all doctors
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div className="home-container">
        <h1 className="home-title">Our Doctors</h1>
        <p className="home-description">
          Explore our list of experienced and skilled doctors. Book an
          appointment with a trusted professional today!
        </p>
        <Row gutter={[24, 24]} className="doctor-list">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorList key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <div className="no-doctors">No doctors available at the moment.</div>
          )}
        </Row>
      </div>
    </Layout>
  );
};

export default HomePage;
