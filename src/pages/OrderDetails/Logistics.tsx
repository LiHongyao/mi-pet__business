import React, { memo } from "react";
import { Steps } from "antd-mobile";
const Step = Steps.Step;


interface IProps {
  data: SPMS.ILogistics
}

const Logistics: React.FC<IProps> = (props) => {
  const { data } = props;

  return (
    <div className="py-13 px-19 bg-FFFFFF mt-6">
      <h1 className="f14 lh-20 mb-13">物流信息</h1>
      <Steps size="small" current={data.list.length}>
        {data.list.map((item: SPMS.ILogistic, index) => (
          <Step key={index} title={item.time} description={item.status} />
        ))}
      </Steps>
    </div>
  );
};

export default memo(Logistics);
