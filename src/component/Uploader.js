import React from "react";
import {
  Spin,
  Form,
  Row,
  Col,
  Button,
  message,
  Divider,
  Select,
  Modal,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import "./Uploader.css";

const { Option } = Select;

class Uploader extends React.Component {
  state = {
    loading: false,
    currentFile: null,
    modalVisible: false,
    fileArr: [],
  };

  handleUpload = (selectorFiles) => {
    console.log(selectorFiles[0].type);
    const reader = new FileReader();
    if (selectorFiles[0]) {
      if (selectorFiles[0].size > 10000000) {
        message.error("图片最大不能超过10MB");
      } else if (
        ![
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ].includes(selectorFiles[0].type)
      ) {
        message.error("文件必须是Excel的格式");
      } else {
        reader.readAsDataURL(selectorFiles[0]);
        reader.onloadend = () => {
          message.success(`${selectorFiles[0].name} 文件成功被加入`);
          this.setState({
            file: selectorFiles[0],
            fileArr: [...this.state.fileArr, selectorFiles[0]],
          });
        };
      }
    }
  };

  inputElement = React.createRef();

  deleteFile = (index) => {
    this.setState(
      {
        fileArr: [
          ...this.state.fileArr.slice(0, index),
          ...this.state.fileArr.slice(index + 1),
        ],
      },
      () => {
        message.warn("文件成功被删除");
      }
    );
  };

  render() {
    const { fileArr, loading } = this.state;

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
                  {fileArr.map((file, index) => (
                    <div className="file-item-container" key={index}>
                      <Button
                        type="default"
                        className="file-item"
                        key={`${index}-item`}
                      >
                        {file.name}
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
