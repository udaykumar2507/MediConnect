import React from "react";

const Spinner = () => {
  const spinnerStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1050,
  };

  const spinnerBorderStyle = {
    width: "3rem",
    height: "3rem",
  };

  return (
    <div style={spinnerStyle}>
      <div className="spinner-border" style={spinnerBorderStyle} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
