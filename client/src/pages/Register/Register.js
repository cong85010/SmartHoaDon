import React, { useEffect, useState } from "react";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "../Login/login.scss";
import { useDispatch, useSelector } from "react-redux";
import { clearState, signupUser, userSelector } from "feature/user/UserSlice";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const Register = () => {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const history = useHistory();
  const [loading, setloading] = useState(false)

  const onFinish = (values) => {
    setloading(true)
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
      dispatch(clearState());
      history.push("/");
    }
    if (isError) {
      setloading(false)
      toast.error(errorMessage);
      dispatch(clearState());
      history.push("/register");
    }
  }, [isSuccess, isError]);

  return (
    <div className="login  flex-center">
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
          rules={[{ required: true, message: "Please input your first name!" }]}
        >
          <Input
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="First name"
          />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Please input your last name!" }]}
        >
          <Input
            type="text"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Last name"
          />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Email!" }]}
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
            disabled={loading}
          >
            {loading?<Spin /> :'Register'}
          </Button>
        </Form.Item>
        <Button>
          <Link to="/login">Login</Link>
        </Button>
      </Form>
    </div>
  );
};

export default Register;
