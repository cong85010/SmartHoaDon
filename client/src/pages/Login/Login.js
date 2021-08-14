import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import { Form, Input, Button, Checkbox, Spin } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./login.scss";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearState, loginUser, userSelector } from "feature/user/UserSlice";
import toast, { Toaster } from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setloading] = useState(false)
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  console.log(isError);
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    setloading(true)
    dispatch(loginUser(values));
  };
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);
  useEffect(() => {
    if (isError) {
      setloading(false);
      toast.error(errorMessage||'Fail to login');
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      history.push("/");
    }
  }, [isError, isSuccess]);
  return (
    <div className="login  flex-center">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        size='large'
      >
        <Toaster position="top-center" reverseOrder={false} />
        <Form.Item
          name="email"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            type='email'
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: "Please input your Password!" },
            { min: 5, message: "Password must be minimum 6 characters." },
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
            disabled={loading}
          >
            {loading?<Spin></Spin>:'Log in'}
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
