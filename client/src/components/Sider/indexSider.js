import React, { useEffect, useState } from "react";
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import "./indexSider.scss";

const { Sider } = Layout;
const { SubMenu } = Menu;

const IndexSider = () => {
  return (
    <Sider className="SiderLeft">
      <div className="logo flex-center">Smart HoaDon</div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<UserOutlined />}>
          Dashboard
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="2">Tom</Menu.Item>
          <Menu.Item key="3">Bill</Menu.Item>
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
