import React, { useEffect, useState } from "react";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./indexSider.scss";
import { Link } from "react-router-dom";

const { Sider } = Layout;
const { SubMenu } = Menu;

const IndexSider = () => {
  return (
    <Sider className="SiderLeft">
      <div className="logo flex-center">Smart Bill</div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to="/home">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/my-bills">Hoá đơn của tôi</Link>
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="4">Team 1</Menu.Item>
          <Menu.Item key="5">Team 2</Menu.Item>
        </SubMenu>
      </Menu>
    </Sider>
  );
};

export default IndexSider;
