const typeBHeader = [
  "序号",
  "日期",
  "报告接受时间",
  "ID",
  "姓名",
  "性别",
  "年龄",
  "单位",
  "联系方式",
  "单位",
  "部门",
  "发现科室",
  "阳性体征",
  "家族史/既往史",
  "重要异常结果报告人",
  "通知时间",
  "通知人",
  "反馈结果",
  "首次回访记录",
  "回访人员",
  "二次回访记录",
  "回访人员",
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

const typeCHeaderValue = {
  序号: "序号",
  ID: "ID",
  姓名: "姓名",
  性别: "性别",
  年龄: "年龄",
  身份证号: "身份证号",
  联系方式: "联系方式",
  单位: "单位",
  部门: "部门",
  复诊主题: "复诊主题",
  复诊描述: "复诊描述",
  通知时间: "通知时间",
  通知人员: "通知人员",
};

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

export { typeBHeader, typeCHeader, typeCHeaderValue, columns };
