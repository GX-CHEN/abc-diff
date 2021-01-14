import React from 'react';
import { PageHeader, Button, Modal } from 'antd';
import './TopBar.css';

class TopBar extends React.Component {
  state = { visible: false };

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleDismiss = e => {
    this.setState({
      visible: false
    });
  };

  render() {
    return (
      <div className="page-header-wrapper">
        <PageHeader
          className="site-page-header"
          title={<div className="page-header-text">记录查重</div>}
          subTitle={<div className="page-header-sub-text">筛除重复Excel记录</div>}
          extra={[
            <Button key="contact" type="primary" onClick={this.showModal}>
              使用指南
            </Button>
          ]}
        />
        <Modal
          title={<div className="bold-card-title">使用指南</div>}
          visible={this.state.visible}
          onOk={this.handleDismiss}
          onCancel={this.handleDismiss}
          cancelButtonProps={{ hidden: true }}>
          <div className="instruction-container">
            <p className="instruction-title">第一步：分别上传之前几个月的B类Excel</p>
            <p className="instruction-text">
              从左侧的上传区域中上传过去几个月的B类联系记录，最多可以支持五个Excel表。若是传错可以删除。
            </p>
            <br />
            <p className="instruction-title">第二步：上传之目前的C类Excel</p>
            <p className="instruction-text">
              从右侧的的上传区域中上传过去现在想查重的C类Excel记录
            </p>
            <br />
            <p className="instruction-title">第三步：点击"查重"按钮</p>
            <p className="instruction-text">
              点击底部的查重按钮，进行记录查重
            </p>
            <br />
          </div>
        </Modal>
      </div>
    );
  }
}

export default TopBar;
