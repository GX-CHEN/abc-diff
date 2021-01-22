import React from "react";
import { Spin, Form, Row, Col, Button, message, Divider, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import XLSX from "xlsx";
import "./Uploader.css";

class Uploader extends React.Component {
  state = {
    loading: false,
    currentFile: null,
    modalVisible: false,
    fileNameArr: [],
  };

  handleUpload = (selectorFiles) => {
    const reader = new FileReader();
    if (selectorFiles[0]) {
      if (selectorFiles[0].size > 10000000) {
        message.error("文件最大不能超过10MB");
      } else if (
        ![
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(selectorFiles[0].type)
      ) {
        message.error("文件必须是Excel的格式");
      } else {
        reader.readAsBinaryString(selectorFiles[0]);
        reader.onload = (event) => {
          message.success(`${selectorFiles[0].name} 文件成功被加入`);
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetData = [];
          workbook.SheetNames.forEach((sheet) => {
            let jsonObject = XLSX.utils.sheet_to_json(workbook.Sheets[sheet], {
              header: this.props.header,
            });
            sheetData.push(...jsonObject);
          });
          this.props.addItem(sheetData);

          this.setState({
            file: selectorFiles[0],
            fileNameArr: [...this.state.fileNameArr, selectorFiles[0].name],
          });
        };
      }
    }
  };

  inputElement = React.createRef();

  deleteFile = (index) => {
    const { fileNameArr } = this.state;
    fileNameArr.splice(index, 1);
    this.setState(
      {
        fileNameArr,
      },
      () => {
        message.warn("文件成功被删除");
      }
    );
    this.props.removeItem(index);
  };

  render() {
    const { fileNameArr, loading } = this.state;

    return (
      <div className="contact-form-container">
        <Spin spinning={loading}>
          <Form>
            <Row>
              <Col xs={24} sm={12} className="fields image-section-container">
                <input
                  ref={(input) => (this.inputElement = input)}
                  type="file"
                  name="user[image]"
                  multiple
                  onChange={(e) => this.handleUpload(e.target.files)}
                  style={{ display: "none" }}
                />
                <Modal
                  title="Add a file"
                  visible={this.state.modalVisible}
                  footer={null}
                  width="60%"
                  onCancel={() => this.setState({ modalVisible: false })}
                >
                  <div
                    style={{
                      border: "1px solid black",
                      width: "100%",
                      height: "300px",
                      color: "black",
                    }}
                  >
                    <div
                      onDragOver={(event) => event.preventDefault()}
                      onDrop={(event) => {
                        event.preventDefault();
                        this.handleUpload(event.dataTransfer.files);
                      }}
                      className="file-drop-content"
                    >
                      <p className="upload-drag-icon">
                        <UploadOutlined />
                      </p>
                      <p>
                        拖拽上传Excel文件，或者 &nbsp;
                        <span
                          onClick={() => {
                            this.inputElement.click();
                          }}
                          className="file-upload-browse"
                        >
                          点击选择本地文件
                        </span>
                      </p>
                    </div>
                  </div>
                </Modal>

                <div className="files-container">
                  {fileNameArr.map((fileName, index) => (
                    <div className="file-item-container" key={index}>
                      <Button
                        type="default"
                        className="file-item"
                        key={`${index}-item`}
                      >
                        {fileName}
                      </Button>
                      <Button
                        shape="circle"
                        type="default"
                        className="delete-button"
                        key={`${index}-delete`}
                        onClick={() => {
                          this.deleteFile(index);
                        }}
                      >
                        <div>X</div>
                      </Button>
                    </div>
                  ))}
                </div>
                <Divider />
                <Button
                  type="default"
                  onClick={() => {
                    this.setState({ modalVisible: true });
                  }}
                  className="desktop-upload-button"
                >
                  添加Excel
                </Button>
                <Button
                  type="default"
                  onClick={() => {
                    this.inputElement.click();
                  }}
                  className="mobile-upload-button"
                >
                  添加Excel
                </Button>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Uploader;
