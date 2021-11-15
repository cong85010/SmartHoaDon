import React from "react";

import react from "react";
import { Spin, Row, Col } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

// Return value should be component
const loadingPage = () => (
  <div style={{ textAlign: "center" }}>
    <Spin indicator={antIcon}></Spin>
  </div>
);

export default loadingPage;
