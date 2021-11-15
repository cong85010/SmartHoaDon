import { SendOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Row, Upload } from "antd";
import ImgCrop from "antd-img-crop";
import "antd/es/modal/style";
import "antd/es/slider/style";
import { billSelector, sendBill } from "feature/bill/BillSlice";
import moment from "moment";
import "moment/locale/vi";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./addbill.scss";
export default function AddBill() {
  moment.locale("vi");

  const [fileList, setFileList] = useState([]);
  const [hoaDon, setHoaDon] = useState();
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  useEffect(() => {
    return () => {
      // dispatch(clearState());
    };
  }, []);
  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);

    if (imgWindow) {
      imgWindow.document.write(image.outerHTML);
    } else {
      window.location.href = src;
    }
  };
  const dispatch = useDispatch();
  const onSubmit = async () => {
    dispatch(sendBill(fileList[0].originFileObj));
  };
  const bill = useSelector(billSelector);
  useEffect(() => {
    setHoaDon(bill);
  }, [bill]);
  console.log(moment(hoaDon?.createdAt).format("hh:mm:ss DD/MM/YYYY"));
  return (
    <div className="addbill">
      <Row justify="center" align="middle">
        <Col span={5}>
          <ImgCrop rotate>
            <Upload
              accept="image/*"
              listType="picture-card"
              fileList={fileList}
              maxCount={1}
              onChange={onChange}
              onPreview={onPreview}
            >
              <UploadOutlined style={{ marginRight: 10 }} /> Upload
            </Upload>
          </ImgCrop>
          <Button
            type="primary"
            shape="round"
            icon={<SendOutlined />}
            size="middle"
            disabled={!fileList.length}
            htmlType="submit"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </Col>
        <Col span={15}>
          <h2 className="flex-center">Chi tiết hoá đơn</h2>
          <Form
            labelCol={{ span: 7 }}
            wrapperCol={{ span: 10 }}
            layout="horizontal"
            // initialValues={{ size: componentSize }}
            // onValuesChange={onFormLayoutChange}
            size="large"
          >
            <Form.Item label="Địa chỉ" name="date-time-picker">
              <Input defaultValue={hoaDon?.address} />
            </Form.Item>
            <Form.Item label="Ngày mua">
              <DatePicker
                defaultValue={moment(hoaDon?.createdAt)}
                showTime
                format={["HH:mm DD/MM/YYYY"]}
              />
            </Form.Item>

            <Form.Item label="Tổng sản phẩm">
              <Input defaultValue={hoaDon?.total} type="number" />
            </Form.Item>
            {hoaDon?.items.map((item, key) => (
              <div>
                <h3 className="flex-center">{`Sản phẩm ${key + 1}`}</h3>
                <Form.Item label="Tên">
                  <Input defaultValue={item.name} />
                </Form.Item>
                <Form.Item label="Giá">
                  <Input defaultValue={item.price} />
                </Form.Item>
                <Form.Item label="Tên">
                  <Input defaultValue={item.quantity} />
                </Form.Item>
              </div>
            ))}
            <Form.Item label="Ngày tạo">
              <Input
                defaultValue={moment(hoaDon?.createdAt).format(
                  "hh:mm DD/MM/YYYY"
                )}
                disabled
              />
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
}
