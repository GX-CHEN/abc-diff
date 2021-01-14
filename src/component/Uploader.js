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
  Modal
} from "antd";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
import { apiPath } from "../data/constants";
import "./Uploader.css";

const { Option } = Select;

class Uploader extends React.Component {
  state = {
    loading: false,
    currentFile: null,
    modalVisible: false,
    fileArr: []
  };

  handleUpload = selectorFiles => {
    console.log(selectorFiles[0].type);
    const reader = new FileReader();
    if (selectorFiles[0]) {
      if (selectorFiles[0].size > 10000000) {
        message.error("File Size exceeds 10mb");
      } else if (
        !["image/png", "image/jpg", "image/jpeg", "application/pdf"].includes(
          selectorFiles[0].type
        )
      ) {
        message.error("File type is not .jpg, .png, or pdf");
      } else {
        reader.readAsDataURL(selectorFiles[0]);
        reader.onloadend = () => {
          message.success(`${selectorFiles[0].name} added successfully`);
          this.setState({
            file: selectorFiles[0],
            fileArr: [...this.state.fileArr, selectorFiles[0]]
          });
        };
      }
    }
  };

  inputElement = React.createRef();

  saveInfo = () => {
    const { currentFile } = this.state;

    if (!currentFile) {
      message.error("Please select before submit");
      return;
    }

    let imageFormObj = new FormData();

    const imgName = "img-" + Date.now() + ".jpg";
    imageFormObj.append("imgName", imgName);
    imageFormObj.append("imgData", currentFile, imgName);

    this.setState({ loading: true });
    axios
      .post(`${apiPath}/saveImageWithLabel`, imageFormObj)
      .then(data => {
        if (data.data.success) {
          message.success("File uploaded succeeded");
          this.setState({ loading: false, file: null, fileArr: [] });
        }
      })
      .catch(err => {
        message.error("File upload failed");
        this.setState({ loading: false });
      });
  };

  deleteFile = index => {
    this.setState(
      {
        fileArr: [
          ...this.state.fileArr.slice(0, index),
          ...this.state.fileArr.slice(index + 1)
        ]
      },
      () => {
        message.warn("File delete succeeded");
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
                <h2>Upload your menu(s)</h2>
                <p>
                  Thank you for purchasing. Now add your menu to help kickstart
                  your menu syndication process
                </p>
                <input
                  ref={input => (this.inputElement = input)}
                  type="file"
                  name="user[image]"
                  multiple
                  onChange={e => this.handleUpload(e.target.files)}
                  accept="image/png, image/jpeg, image/jpg, application/pdf "
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
                      color: "black"
                    }}
                  >
                    <div
                      onDragOver={event => event.preventDefault()}
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
                        Drag and drop file (PDF, PNG, JPG) or &nbsp;
                        <span
                          onClick={() => {
                            this.inputElement.click();
                          }}
                          className="file-upload-browse"
                        >
                          Browse
                        </span>
                      </p>
                    </div>
                  </div>
                </Modal>

                <div className="files-container">
                  {fileArr.map((file, index) => (
                    <div className="file-item-container" key={index}>
                      <Button
                        icon="file"
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
                        X
                      </Button>
                      <span className="menu-type-container">
                        <Select
                          showSearch
                          style={{ width: 120, border: "none" }}
                          bordered={false}
                          placeholder="Menu Type"
                        >
                          <Option value="lunch">Lunch</Option>
                          <Option value="breakfast">Breakfast</Option>
                          <Option value="dinner">Dinner</Option>
                        </Select>
                      </span>
                    </div>
                  ))}
                </div>
                <Divider />
                <Button
                  icon="upload"
                  type="default"
                  onClick={() => {
                    this.setState({ modalVisible: true });
                  }}
                  className="desktop-upload-button"
                >
                  Add a file
                </Button>
                <Button
                  icon="upload"
                  type="default"
                  onClick={() => {
                    this.inputElement.click();
                  }}
                  className="mobile-upload-button"
                >
                  Add a file
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={24}>
                <div className="submit-button">
                  <Button type="primary" onClick={this.saveInfo}>
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Spin>
      </div>
    );
  }
}

export default Uploader;
