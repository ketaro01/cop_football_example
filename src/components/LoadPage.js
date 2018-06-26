import React, { Component } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

const LoadPage = () => {
  const loadStyle = {
    position: "absolute",
    width: 400,
    height: 400,
    top: "50%",
    left: "50%",
    margin: "-200px 0 0 -200px",
    textAlign: "center",
    verticalAlign: "middle"
  };

  return (
    <div style={loadStyle}>
      <CircularProgress size={50} />
    </div>
  );
};

export default LoadPage;
