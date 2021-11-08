import React, { useEffect, useState } from "react";
import "./header.scss";
import { useHistory } from "react-router";
import {
  clearState,
  fetchUserByToken,
  userSelector,
} from "feature/user/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import Text from "antd/lib/typography/Text";
import {
  PageHeader,
  Menu,
  Dropdown,
  Button,
  message,
  Space,
  Tooltip,
} from "antd";
import { DownOutlined, UserOutlined, LogoutOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

function handleMessageNotify(e) {
  console.log("click", e);
  if (e === "login-success") {
    toast.success("Đăng nhập thành công");
  }
  if (e.key === "3") {
    message.success("Đăng xuất thành công - Hẹn gặp lại");
  }
}
const Header = () => {
  const history = useHistory();
  const [successLogin, setSuccessLogin] = useState(false);
  const { isSuccess, isError, email, firstName, lastName } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserByToken({ auth_token: localStorage.getItem("token") }));
  }, []);
  useEffect(() => {
    if (isSuccess) {
      handleMessageNotify("login-success");
      setSuccessLogin(true);
    }
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError, isSuccess]);
  const onLogOut = () => {
    localStorage.removeItem("token");
    setSuccessLogin(false);
    history.push("/login");
  };
  const onGoBack = () => {
    history.goBack();
  };
  const fullName = (firstName + " " + lastName).toUpperCase();
  return (
    <>
      <div className="site-page-header-ghost-wrapper header">
      <Toaster position="top-center" reverseOrder={false} />
        <PageHeader
          ghost={false}
          onBack={onGoBack}
          extra={[
            <Text>
              <UserMemo
                isSuccess={successLogin}
                fullname={fullName}
                onLogOut={onLogOut}
              />
            </Text>,
          ]}
        ></PageHeader>
      </div>
      <div className="h-space-100px" />
    </>
  );
};
const UserMemo = ({ isSuccess, fullname, onLogOut }) => {
  const menu = (
    <Menu onClick={handleMessageNotify}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        Thông tin
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item key="3" onClick={onLogOut} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return isSuccess ? (
    <Dropdown.Button
      overlay={menu}
      placement="bottomCenter"
      icon={<UserOutlined />}
    >
      {fullname}
    </Dropdown.Button>
  ) : (
    <Button>
      <Link to="/login">Đăng nhập</Link>
    </Button>
  );
};
export default Header;
