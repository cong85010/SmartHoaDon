import React, { useEffect, useState } from "react";
import "./header.scss";
import { useHistory, withRouter } from "react-router";
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
  Breadcrumb,
} from "antd";
import {
  HomeOutlined,
  UserOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { getToken } from "components/AppMain";

function handleMessageNotify(e) {
  console.log("click", e);
  if (e.key === "3") {
    toast.success("Đăng xuất thành công - Hẹn gặp lại");
  }
}
const Header = () => {
  const history = useHistory();
  const [successLogin, setSuccessLogin] = useState(false);
  const { isSuccess, isError, email, firstName, lastName } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUserByToken({ auth_token: getToken() }));
  }, []);
  useEffect(() => {
    console.log(window.location.pathname);
  }, [window.location.pathname]);
  useEffect(() => {
    if (isSuccess) {
      setSuccessLogin(true);
    }
    if (isError) {
      dispatch(clearState());
      history.push("/login");
    }
  }, [isError, isSuccess]);
  const onLogOut = () => {
    document.cookie = "token=''";
    document.cookie = "expires=''";
    setSuccessLogin(false);
    dispatch(clearState());
    history.push("/login");
  };
  const onGoBack = () => {
    history.goBack();
  };
  const fullName =  (firstName + " " + lastName).toUpperCase();
  return (
    <>
      <div
        className={`site-page-header-ghost-wrapper header ${
          !successLogin && "header__login"
        }`}
      >
        <Toaster position="top-center" reverseOrder={false} />
        <PageHeader
          ghost={!successLogin}
          title={successLogin && [<ArrowLeftOutlined onClick={onGoBack} />]}
          subTitle={
            successLogin && <BreadCrumb history={window.location.pathname} />
          }
          extra={[
            <Text>
              <UserMemo
                fullname={fullName}
                onLogOut={onLogOut}
              />
            </Text>,
          ]}
        ></PageHeader>
      </div>
    </>
  );
};
const BreadCrumb = withRouter((props) => {
  const { location } = props;
  let str = location.pathname.split("/");
  str = str[1] === "home" ? str.splice(2) : str.splice(1);
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link to="/home">
          <HomeOutlined />
        </Link>
      </Breadcrumb.Item>
      {str.map((item, index) => (
        <Breadcrumb.Item key={index}>
          <Text type="secondary">{item}</Text>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
});
const UserMemo = ({ fullname, onLogOut }) => {
  const menu = (
    <Menu onClick={handleMessageNotify}>
      <Menu.Item key="1" icon={<UserOutlined />}>
        <Link to="/user">Thông tin</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        Đổi mật khẩu
      </Menu.Item>
      <Menu.Item key="3" onClick={onLogOut} icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown.Button
      overlay={menu}
      placement="bottomCenter"
      icon={<UserOutlined />}
    >
      {fullname}
    </Dropdown.Button>
  );
};
export default Header;
