import React, { useEffect } from "react";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import "./indexSider.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  fetchUserByToken,
  userSelector,
} from "feature/user/UserSlice";

const { Sider } = Layout;
const { SubMenu } = Menu;

const IndexSider = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { isFetching, isError } = useSelector(userSelector);
  useEffect(() => {
    dispatch(fetchUserByToken({ auth_token: localStorage.getItem("token") }));
  }, []);
  const { email, firstName, lastName } = useSelector(userSelector);
  console.log({ email, firstName, lastName })
  useEffect(() => {
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError]);
  const onLogOut = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };
  return (
    <Sider className="SiderLeft">
      <div className="logo flex-center">Smart HoaDon</div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to="/login">Đăng nhập</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<DesktopOutlined />}>
          Option 2
        </Menu.Item>
        <SubMenu key="sub1" icon={<UserOutlined />} title="User">
          <Menu.Item key="3">Tom</Menu.Item>
          <Menu.Item key="4">Bill</Menu.Item>
          <Menu.Item key="5">Alex</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<TeamOutlined />} title="Team">
          <Menu.Item key="6">Team 1</Menu.Item>
          <Menu.Item key="8">Team 2</Menu.Item>
        </SubMenu>
        
        {/* {email && ( */}
          <Menu.Item key="9" icon={<FileOutlined />}>
            <span onClick={onLogOut}>Log Out</span>
          </Menu.Item>
        
      </Menu>
    </Sider>
  );
};

export default IndexSider;
