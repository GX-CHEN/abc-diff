import { Row, Col, Card, Button } from "antd";
import React, { useState } from "react";
import "antd/dist/antd.css";
import "./App.css";
import TopBar from "./component/TopBar";
import Uploader from "./component/Uploader";

function App() {
  const typeBHeader = [
    "序号",
    "时间",
    "ID",
    "姓名",
    "性别",
    "年龄",
    "单位",
    "联系方式",
    "发现科室",
    "阳性体征",
    "家族史/既往史",
    "通知时间",
    "通知人员",
  ];

  const typeCHeader = [
    "序号",
    "ID",
    "姓名",
    "性别",
    "年龄",
    "身份证号",
    "联系方式",
    "单位",
    "部门",
    "复诊主题",
    "复诊描述",
    "通知时间",
    "通知人员",
  ];

  const [typeBArray, setTypeBArray] = useState([]);
  const [typeCArray, setTypeCArray] = useState([]);

  const addTypeBItem = (item) => {
    setTypeBArray([...typeBArray, item]);
    console.log(typeBArray);
  };

  const addTypeCItem = (item) => {
    setTypeCArray([...typeCArray, item]);
  };

  const removeTypeBItem = (index) => {
    const newTypeBArray = [...typeBArray];
    typeBArray.splice(index, 1);
    setTypeBArray(newTypeBArray);
  };

  const removeTypeCItem = (index) => {
    const newTypeCArray = [...typeCArray];
    typeCArray.splice(index, 1);
    setTypeCArray(newTypeCArray);
  };

  const doFilter = () => {
    console.log({ typeBArray, typeCArray });
  };

  return (
    <div className="app">
      <TopBar />
      <Row>
        <Col xs={24} md={12}>
          <Card
            title={<div className="bold-card-title">B类Excel</div>}
            bordered={false}
            className="card-container"
          >
            点击或拖拽上传文件
            <Uploader
              maxItem={5}
              addItem={addTypeBItem}
              removeItem={removeTypeBItem}
              header={typeBHeader}
            />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={<div className="bold-card-title">C类Excel</div>}
            bordered={false}
            className="card-container"
          >
            点击或拖拽上传文件
            <Uploader
              maxItem={1}
              addItem={addTypeCItem}
              removeItem={removeTypeCItem}
              header={typeCHeader}
            />
          </Card>
        </Col>
        <Col xs={24}>
          <Button
            type="primary"
            className="trigger-button"
            size="large"
            onClick={doFilter}
          >
            进行筛查
          </Button>
        </Col>
      </Row>
    </div>
  );
}

export default App;
