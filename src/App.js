import { Row, Col, Card, Button, Table } from "antd";
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

  const columns = [
    {
      title: "序号",
      dataIndex: "序号",
      key: "序号",
    },
    {
      title: "ID",
      dataIndex: "ID",
      key: "ID",
    },
    {
      title: "姓名",
      dataIndex: "姓名",
      key: "姓名",
    },
    {
      title: "性别",
      dataIndex: "性别",
      key: "性别",
    },
    {
      title: "年龄",
      dataIndex: "年龄",
      key: "年龄",
    },
    {
      title: "身份证号",
      dataIndex: "身份证号",
      key: "身份证号",
    },
    {
      title: "联系方式",
      dataIndex: "联系方式",
      key: "联系方式",
    },
    {
      title: "单位",
      dataIndex: "单位",
      key: "单位",
    },
    {
      title: "部门",
      dataIndex: "部门",
      key: "部门",
    },
    {
      title: "复诊主题",
      dataIndex: "复诊主题",
      key: "复诊主题",
    },
    {
      title: "复诊描述",
      dataIndex: "复诊描述",
      key: "复诊描述",
    },
    {
      title: "通知时间",
      dataIndex: "通知时间",
      key: "通知时间",
    },
    {
      title: "通知人员",
      dataIndex: "通知人员",
      key: "通知人员",
    },
  ];

  const [typeBArray, setTypeBArray] = useState([]);
  const [typeCArray, setTypeCArray] = useState([]);
  const [duplicate, setDuplicate] = useState([]);

  const addTypeBItem = (item) => {
    setTypeBArray([...typeBArray, item]);
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
    const allTypeBItems = [];
    typeBArray.forEach((data) => {
      allTypeBItems.push(...data);
    });
    const allTypeCItems = typeCArray[0];
    const allTypeBIds = allTypeBItems.map((item) => String(item.ID));
    const duplicateC = (allTypeCItems || []).filter(
      (cItem) =>
        cItem.ID && cItem.ID !== "ID" && allTypeBIds.includes(String(cItem.ID))
    );

    setDuplicate(duplicateC);
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
        {duplicate.length && (
          <Col xs={24}>
            <Card
              title={<div className="bold-card-title">重复项列表</div>}
              bordered={false}
              className="card-container"
            >
              <Table dataSource={duplicate} columns={columns} />;
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default App;
