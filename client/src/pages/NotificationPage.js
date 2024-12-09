import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs, Badge, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles/NotificationStyles.css'

const NotificationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/get-all-notification",
        {
          userId: user._id,
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
      console.log(error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/delete-all-notification",
        { userId: user._id },
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
      console.log(error);
      message.error("Something went wrong with notifications");
    }
  };

  return (
    <Layout>
      <div className="notification-page">
        <h4 className="title">Notifications</h4>
        <Tabs className="notification-tabs">
          <Tabs.TabPane
            tab={<Badge count={user?.notifcation.length}>Unread</Badge>}
            key="0"
          >
            <div className="actions">
              <Button type="primary" onClick={handleMarkAllRead}>
                Mark All Read
              </Button>
            </div>
            <div className="notification-list">
              {user?.notifcation.map((notificationMgs, index) => (
                <div
                  className="notification-card unread"
                  key={index}
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  <p>{notificationMgs.message}</p>
                </div>
              ))}
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane
            tab={<Badge count={user?.seennotification.length}>Read</Badge>}
            key="1"
          >
            <div className="actions">
              <Button type="danger" onClick={handleDeleteAllRead}>
                Delete All Read
              </Button>
            </div>
            <div className="notification-list">
              {user?.seennotification.map((notificationMgs, index) => (
                <div
                  className="notification-card read"
                  key={index}
                  onClick={() => navigate(notificationMgs.onClickPath)}
                >
                  <p>{notificationMgs.message}</p>
                </div>
              ))}
            </div>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
