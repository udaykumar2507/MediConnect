import React from "react";
import Layout from "./../components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import "../styles/ApplyDoctorStyles.css"; // Import updated styles

const ApplyDoctor = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle form submission
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/apply-doctor",
        {
          ...values,
          userId: user._id,
          timings: [
            moment(values.timings[0]).format("HH:mm"),
            moment(values.timings[1]).format("HH:mm"),
          ],
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
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="apply-doctor-container">
        <div className="form-header">
          <h1>Doctor Application Form</h1>
          <p>Submit your application and join our trusted healthcare network.</p>
        </div>
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="apply-doctor-form"
        >
          <div className="form-section">
            <h3>Personal Information</h3>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  rules={[{ required: true, message: "Please enter your first name." }]}
                >
                  <Input placeholder="Enter your first name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  rules={[{ required: true, message: "Please enter your last name." }]}
                >
                  <Input placeholder="Enter your last name" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Phone Number"
                  name="phone"
                  rules={[{ required: true, message: "Please provide a phone number." }]}
                >
                  <Input placeholder="Enter your phone number" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Email Address"
                  name="email"
                  rules={[{ required: true, message: "Email address is required." }]}
                >
                  <Input placeholder="Enter your email address" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item label="Website" name="website">
                  <Input placeholder="Enter your website (optional)" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Clinic Address"
                  name="address"
                  rules={[{ required: true, message: "Address is required." }]}
                >
                  <Input placeholder="Enter your clinic address" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="form-section">
            <h3>Professional Details</h3>
            <Row gutter={20}>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Specialization"
                  name="specialization"
                  rules={[{ required: true, message: "Please specify your specialization." }]}
                >
                  <Input placeholder="Enter your specialization" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Experience (in years)"
                  name="experience"
                  rules={[{ required: true, message: "Experience is required." }]}
                >
                  <Input placeholder="Enter your experience in years" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Consultation Fee"
                  name="feesPerCunsaltation"
                  rules={[{ required: true, message: "Consultation fee is required." }]}
                >
                  <Input placeholder="Enter your consultation fee" />
                </Form.Item>
              </Col>
              <Col xs={24} md={12} lg={8}>
                <Form.Item
                  label="Available Timings"
                  name="timings"
                  rules={[{ required: true, message: "Please select your available timings." }]}
                >
                  <TimePicker.RangePicker format="HH:mm" />
                </Form.Item>
              </Col>
            </Row>
          </div>

          <div className="form-footer">
            <button className="submit-btn" type="submit">
              Submit Application
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default ApplyDoctor;
