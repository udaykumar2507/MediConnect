import React from "react";
import "../styles/LayoutStyles.css";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Badge, message } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // Doctor menu
  const doctorMenu = [
    { name: "Home", path: "/", icon: "fa-solid fa-house" },
    { name: "Appointments", path: "/doctor-appointments", icon: "fa-solid fa-list" },
    { name: "Profile", path: `/doctor/profile/${user?._id}`, icon: "fa-solid fa-user" },
  ];

  // Determine sidebar menu
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;

  return (
    <div className="app-container">
      <div className="app-sidebar">
        <div className="sidebar-logo">
          <h6 className="logo-text">DOC APP</h6>
          <hr />
        </div>
        <div className="sidebar-menu">
          {SidebarMenu.map((menu) => {
            const isActive = location.pathname === menu.path;
            return (
              <div key={menu.path} className={`menu-item ${isActive ? "active" : ""}`}>
                <i className={menu.icon}></i>
                <Link to={menu.path}>{menu.name}</Link>
              </div>
            );
          })}
          <div className="menu-item logout-item" onClick={handleLogout}>
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Logout</span>
          </div>
        </div>
      </div>

      <div className="app-content">
        <div className="app-header">
          <div className="header-content" onClick={() => navigate("/notification")}>
            <Badge count={user?.notifcation.length} className="notification-badge">
              <i className="fa-solid fa-bell"></i>
            </Badge>
            <Link to="/profile" className="profile-link">
              {user?.name}
            </Link>
          </div>
        </div>
        <div className="app-body">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
