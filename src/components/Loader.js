import React from "react";
import { Spin } from "antd";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="loader-center">
        <Spin size="large" tip="Loading..." />
      </div>
    </div>
  );
};

export default Loader;
