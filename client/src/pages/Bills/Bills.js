import { Button, Col, Row, Table } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { EditOutlined } from "@ant-design/icons";
export default function Bills() {
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      address: `Edward King ${i}`,
      quanlity: 32,
      buyDate: `London, Park Lane no. ${i}`,
      createAtDate: `London, Park Lane no. ${i}`,
      edit: <EditOutlined />,
    });
  }

  const columns = [
    {
      title: "Địa chỉ",
      dataIndex: "address",
      width: "20%",
    },
    {
      title: "Ngày mua",
      dataIndex: "buyDate",
      width: "20%",
    },
    {
      title: "Số lượng sản phẩm",
      dataIndex: "quanlity",
      width: "20%",
      align: "right",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createAtDate",
      width: "20%",
    },
    {
      title: "Chức năng",
      dataIndex: "edit",
      width: "10%",
      align: "center",
    },
  ];
  return (
    <div className="bills">
      <Row>
        <Col>
          <Button type="primary" style={{ marginBottom: 16 }}>
            <Link to="/add-bill">Thêm hoá đơn</Link>
          </Button>
        </Col>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={data}
            pagination={{ pageSize: 50 }}
            scroll={{ y: 540 }}
            expandable={{ expandedRowRender }}
          />
        </Col>
      </Row>
    </div>
  );
}

const expandedRowRender = () => {
  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Name", dataIndex: "name", key: "name" },
    {
      title: "Status",
      key: "state",
    },
    { title: "Upgrade Status", dataIndex: "upgradeNum", key: "upgradeNum" },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
    },
  ];

  const data = [];
  for (let i = 0; i < 3; ++i) {
    data.push({
      key: i,
      date: "2014-12-24 23:12:00",
      name: "This is production name",
      upgradeNum: "Upgraded: 56",
    });
  }
  return <Table columns={columns} dataSource={data} pagination={false} />;
};
