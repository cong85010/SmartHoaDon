import { Button, Col, Form, Input, Row, Spin } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearState, userSelector } from "feature/user/UserSlice";
import { Link, useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import LoadingPage from "components/loadingPage/loadingPage";

export default function User() {
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, email, firstName, lastName } =
    useSelector(userSelector);
  const history = useHistory();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    // dispatch(signupUser(values));
  };

  useEffect(() => {}, [isSuccess, isError]);
  return (
    <div>
      <Row justify="center">
        <Col>
          <h1>Thông tin</h1>
          {isFetching ? (
            <LoadingPage />
          ) : (
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
                  defaultValue={firstName}
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
                  defaultValue={lastName}
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
                  defaultValue={email}
                  disabled
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
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
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
                  {isFetching ? <Spin /> : "Cập nhật"}
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>
    </div>
  );
}
