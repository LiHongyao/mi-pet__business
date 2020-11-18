import React, { memo, useState } from 'react'
import './index.scss'


interface IProps {
  data: SPMS.ISpec[],
  onChange?: (spec: SPMS.ISpec) => void
}
const SpecBox: React.FC<IProps> = props => {
  
  const { data, onChange } = props;

  const [cur, setCur] = useState(0);

  const _onSpecItemTap = (index: number) => {
    if(index === cur) return;
    setCur(index);
    onChange && onChange(data[index]);
  }

  return (
    <div className="lg-spec">
      {data.map((item: SPMS.ISpec, index: number) => (
        <div 
          key={index} 
          className={`lg-spec__item ${cur === index ? 'selected' : ''}`} 
          onClick={() => { _onSpecItemTap(index)}}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default memo(SpecBox);
