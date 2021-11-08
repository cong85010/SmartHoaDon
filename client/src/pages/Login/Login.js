import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearState,
  fetchUserByToken,
  loginUser,
  userSelector,
} from "feature/user/UserSlice";
import toast, { Toaster } from "react-hot-toast";
import logo from "assets/images/logo.png";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  console.log(isSuccess);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(loginUser(values));
  };
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isError) {
      toast.error(errorMessage || "");
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [errorMessage, isError, isSuccess, isFetching, history]);
  return (
    <div className="login  flex-center">
      <img className="login_register__logo" src={logo} alt="logo" />
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your Email!",
            },
          ]}
        >
          <Input
            type="email"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 6, message: "Password must be minimum 6 characters." },
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isFetching}
          >
            {isFetching ? <Spin></Spin> : "Log in"}
          </Button>
          <span>Or </span>
          <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
