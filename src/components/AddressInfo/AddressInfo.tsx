import React, { memo } from "react";


interface IProps {
  address: SPMS.IAddress;
}

const AddressInfo: React.FC<IProps> = (props) => {
  // props
  const { address } = props;
  // render
  return (
    <div className="py-13 px-19 bg-FFFFFF mt-6 color-393939">
      <h1 className="f14 lh-20 mb-13">收货人信息</h1>
      <p className="mb-7">
        <span className="f14 lh-20 mr-10">{address.name}</span>
        <span className="f11 lh-16 color-828282">{address.phone}</span>
      </p>
      <p className="f12 lh-17">{address.address + (address.doorplate || '')}</p>
    </div>
  );
};

export default memo(AddressInfo);
