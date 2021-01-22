import React, { useState } from "react";
import { Row, Col, Card, Button, Table } from "antd";
import XLSX from "xlsx";
import "antd/dist/antd.css";
import "./App.css";
import TopBar from "./component/TopBar";
import Uploader from "./component/Uploader";
import {
  typeBHeader,
  typeCHeader,
  typeCHeaderValue,
  columns,
} from "./constants";

function App() {
  const [typeBArray, setTypeBArray] = useState([]);
  const [typeCArray, setTypeCArray] = useState([]);
  const [duplicate, setDuplicate] = useState([]);
  const [nonDuplicate, setNonDuplicate] = useState([]);

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

    const nonDuplicateC = (allTypeCItems || []).filter(
      (cItem) =>
        cItem.ID && cItem.ID !== "ID" && !allTypeBIds.includes(String(cItem.ID))
    );

    setDuplicate(duplicateC);
    setNonDuplicate(nonDuplicateC);
  };

  const exportExcel = () => {
    const data = [
      { ID: "重复项" },
      typeCHeaderValue,
      ...duplicate,
      { ID: "" },
      { ID: "非重复项" },
      typeCHeaderValue,
      ...nonDuplicate,
    ];

    /* make the worksheet */
    const ws = XLSX.utils.json_to_sheet(data);

    /* add to workbook */
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "record");

    /* generate an XLSX file */
    XLSX.writeFile(wb, "结果.xlsx");
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
        {duplicate.length && (
          <Col xs={24}>
            <Button
              type="primary"
              className="trigger-button"
              size="large"
              onClick={exportExcel}
            >
              导入Excel结果
            </Button>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default App;
