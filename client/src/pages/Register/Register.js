import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Spin, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../Login/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearState, signupUser, userSelector } from "feature/user/UserSlice";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import logo from "assets/images/logo.png";

const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    dispatch(signupUser(values));
  };
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Đăng ký thành công");
      dispatch(clearState());
      history.push("/login");
    }
    if (isError) {
      toast.error(errorMessage);
      dispatch(clearState());
    }
  }, [isSuccess, isError]);

  return (
    <div className="login  flex-center">
      <img className="login_register__logo" src={logo} alt="logo" />
      <Form
        name="normal_register"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size="large"
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Form.Item
          name="firstName"
          rules={[
            {
              type: "",
              required: true,
              message: "Please input your first name!",
            },
          ]}
        >
          <Input
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[
            {
              pattern: /[a-zA-Z]{2,}/,
              required: true,
              message: "Please input your last name!",
            },
          ]}
        >
          <Input
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              required: true,
              message: "Please input your email!",
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
          hasFeedback
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            disabled={isFetching}
          >
            {isFetching ? <Spin /> : "Register"}
          </Button>
          <span>Or </span>
          <Link to="/login">Login now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;
