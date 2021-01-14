import { Row, Col, Card } from "antd";
import "antd/dist/antd.css";
import "./App.css";
import TopBar from "./component/TopBar";

function App() {
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
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card
            title={<div className="bold-card-title">C类Excel</div>}
            bordered={false}
            className="card-container"
          >
            点击或拖拽上传文件
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default App;
