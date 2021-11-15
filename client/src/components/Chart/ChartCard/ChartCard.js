import React, { useEffect } from "react";
import {
  ChartCard,
  yuan,
  Field,
  MiniArea,
  MiniProgress,
} from "ant-design-pro/lib/Charts";
import Trend from "ant-design-pro/lib/Trend";
import { Row, Col, Tooltip } from "antd";
import numeral from "numeral";

import "./chartCardComponent.scss";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStatisticalBillMoney,
  statisticalAvgCountMonth,
  statisticalSelector,
} from "feature/statistical/StatisticalSlice";
export const convertUStoVND = (value) => numeral(value).format("0,0") + " VND";
const visitData = [];
const beginDay = new Date().getTime();
for (let i = 0; i < 20; i += 1) {
  visitData.push({
    x: moment(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format(
      "YYYY-MM-DD"
    ),
    y: Math.floor(Math.random() * 100) + 10,
  });
}
export default function ChartCardComponent() {
  const dispatch = useDispatch();
  const { sumTotalBill, countBill } = useSelector(statisticalSelector);

  useEffect(() => {
    dispatch(fetchStatisticalBillMoney());
  }, []);
  console.log(sumTotalBill);
  return (
    <div className="chartCardComponent">
      <Row justify="space-around">
        <Col span={7}>
          <ChartMiniMoneyBill totalBill={sumTotalBill} />
        </Col>
        <Col span={7}>
          <ChartMiniMonthBill countBill={countBill} />
        </Col>
        <Col span={7}>
          <ChartCard
            title="CHỈ TIÊU THÁNG HIÊN TẠI"
            total="78%"
            footer={
              <div>
                <span>
                  Hạn mức
                  <Trend
                    flag="up"
                    style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}
                  >
                    {convertUStoVND(1500000)}
                  </Trend>
                </span>
              </div>
            }
            contentHeight={46}
          >
            <MiniProgress percent={78} strokeWidth={8} target={80} />
          </ChartCard>
        </Col>
      </Row>
    </div>
  );
}
const ChartMiniMoneyBill = ({ totalBill }) => {
  return (
    <ChartCard
      title="TỔNG CHI TIÊU"
      total={() => (
        <span dangerouslySetInnerHTML={{ __html: convertUStoVND(totalBill) }} />
      )}
      footer={
        <Field label="Trung bình hàng tháng" value={convertUStoVND(1220423)} />
      }
      contentHeight={46}
    >
      <span>
        Hàng tháng
        <Trend flag="up" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
          12%
        </Trend>
      </span>
      <span style={{ marginLeft: 16 }}>
        Hàng tuần
        <Trend flag="down" style={{ marginLeft: 8, color: "rgba(0,0,0,.85)" }}>
          11%
        </Trend>
      </span>
    </ChartCard>
  );
};
const ChartMiniMonthBill = ({ countBill }) => {
  const { countAllBill, details } = useSelector(statisticalSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(statisticalAvgCountMonth(moment().format("MM")));
  }, []);
  const avgMonth = countAllBill / details.length;
  console.log(countAllBill, details);
  return (
    <ChartCard
      title="TỔNG HOÁ ĐƠN"
      total={() => (
        <span
          dangerouslySetInnerHTML={{
            __html: numeral(countBill).format("0,0"),
          }}
        />
      )}
      footer={
        <Field
          label="Trung bình hàng tháng"
          value={numeral(avgMonth).format("0,0")}
        />
      }
    >
      <MiniArea line height={45} data={visitData} />
    </ChartCard>
  );
};
